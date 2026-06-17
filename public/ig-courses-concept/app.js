/* IG Group Courses prototype — vanilla JS, no build step. */
(function () {
  const DATA = window.IG_DATA;
  const courseData = DATA.courseData;
  const partnerCatalog = DATA.partnerCatalog;
  const lessons = DATA.lessons;

  // ---------- Helpers ----------
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v == null) continue;
      if (k === 'class') node.className = v;
      else if (k === 'dataset') Object.assign(node.dataset, v);
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'html') node.innerHTML = v;
      else node.setAttribute(k, v);
    }
    children.flat().forEach(c => {
      if (c == null || c === false) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function fmtPrice(n) {
    return '$' + Number(n).toLocaleString('en-US');
  }

  function fmtDateRange(start, end) {
    // start/end are ISO yyyy-mm-dd, treat as UTC-ish to avoid TZ shift
    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
    const monthFmt = (d) => d.toLocaleString('en-US', { month: 'short' });
    const dayFmt = (d) => d.getDate();
    const yearFmt = (d) => d.getFullYear();
    if (sameMonth) {
      return `${monthFmt(s)} ${dayFmt(s)}–${dayFmt(e)}, ${yearFmt(s)}`;
    }
    return `${monthFmt(s)} ${dayFmt(s)} – ${monthFmt(e)} ${dayFmt(e)}, ${yearFmt(e)}`;
  }

  function dayOfWeek(start, end) {
    const s = new Date(start + 'T00:00:00');
    const e = new Date(end + 'T00:00:00');
    const dow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return `${dow[s.getDay()]}–${dow[e.getDay()]}`;
  }

  // ---------- State ----------
  const state = {
    search: '',
    category: '',
    vendor: '',
    level: '',
    openIds: new Set(),
    activeCourse: null,
    selectedDateIdx: 0,
  };

  // ---------- Populate filter selects ----------
  const categorySel = $('#filter-category');
  courseData.categories.forEach(c => categorySel.appendChild(el('option', {}, c)));
  const vendorSel = $('#filter-vendor');
  courseData.vendors.forEach(v => vendorSel.appendChild(el('option', {}, v)));

  // ---------- Render course cards ----------
  const grid = $('#course-grid');
  const totalCountEl = $('#total-count');
  const resultCountEl = $('#result-count');
  totalCountEl.textContent = courseData.courses.length;
  $('#stat-courses').textContent = courseData.courses.length;

  function buildCard(course) {
    const isOpen = state.openIds.has(course.id);
    const next = course.schedule.slice(0, 3);
    const all = course.schedule;

    const nextList = el('ul', { 'data-testid': `list-next-dates-${course.id}` },
      ...next.map(s => el('li', {},
        el('span', { class: 'd' }, fmtDateRange(s.start, s.end)),
        el('span', { class: 't' }, `${dayOfWeek(s.start, s.end)} · ${s.start_time}–${s.end_time} ${s.zone}`)
      ))
    );

    const allDates = el('div', { class: 'all-dates' },
      ...all.map(s => el('div', {},
        el('span', { class: 'd' }, fmtDateRange(s.start, s.end)),
        ' · ',
        el('span', {}, `${s.start_time}–${s.end_time} ${s.zone}`)
      ))
    );

    const card = el('article', {
      class: 'course-card' + (isOpen ? ' is-open' : ''),
      role: 'listitem',
      'data-testid': `card-course-${course.id}`,
      'data-course-id': course.id,
    },
      el('div', { class: 'vendor-row' },
        el('span', { class: 'vendor-tag' }, course.vendor),
        el('span', { class: 'level-tag level-' + course.level }, course.level)
      ),
      el('h3', { 'data-testid': `text-title-${course.id}` }, course.title),
      el('p', { class: 'summary' }, course.summary),
      el('div', { class: 'price-row' },
        el('span', { class: 'price', 'data-testid': `text-price-${course.id}` }, fmtPrice(course.sale_price)),
        course.regular_price > course.sale_price
          ? el('span', { class: 'price-was' }, fmtPrice(course.regular_price))
          : null,
        course.regular_price > course.sale_price
          ? el('span', { class: 'price-save' }, `Save ${fmtPrice(course.regular_price - course.sale_price)}`)
          : null
      ),
      el('div', { class: 'next-dates' },
        el('h4', {}, `Next ${next.length} cohort${next.length !== 1 ? 's' : ''}`),
        nextList
      ),
      el('div', { class: 'card-actions' },
        el('button', {
          class: 'btn btn-primary',
          'data-testid': `button-check-${course.id}`,
          onClick: () => openModal(course),
        }, 'Check Availability'),
        el('button', {
          class: 'icon-btn',
          'aria-expanded': String(isOpen),
          'aria-controls': `expand-${course.id}`,
          'data-testid': `button-expand-${course.id}`,
          title: isOpen ? 'Hide details' : 'Show syllabus & all dates',
          onClick: () => toggleExpand(course.id),
        },
          el('span', { 'aria-hidden': 'true' }, isOpen ? '−' : '+'),
          el('span', { class: 'sr-only' }, isOpen ? 'Hide details' : 'Show details')
        )
      ),
      el('div', { class: 'expand-region', id: `expand-${course.id}`, 'data-testid': `region-expand-${course.id}` },
        el('h4', {}, 'Syllabus summary'),
        el('ul', {}, ...course.syllabus.map(s => el('li', {}, s))),
        el('h4', { style: 'margin-top:18px;' }, `All ${all.length} cohort dates`),
        allDates
      )
    );
    return card;
  }

  function toggleExpand(id) {
    if (state.openIds.has(id)) state.openIds.delete(id);
    else state.openIds.add(id);
    render();
  }

  function matches(course) {
    if (state.category && course.category !== state.category) return false;
    if (state.vendor && course.vendor !== state.vendor) return false;
    if (state.level && course.level !== state.level) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = [
        course.title, course.vendor, course.category, course.level, course.summary,
        ...(course.syllabus || []),
      ].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function renderChips() {
    const chips = $('#active-chips');
    chips.innerHTML = '';
    const items = [];
    if (state.category) items.push(['category', state.category]);
    if (state.vendor) items.push(['vendor', state.vendor]);
    if (state.level) items.push(['level', state.level]);
    if (state.search) items.push(['search', `"${state.search}"`]);

    items.forEach(([key, label]) => {
      const chip = el('span', { class: 'chip', 'data-testid': `chip-${key}` },
        label,
        el('button', {
          'aria-label': `Remove ${key} filter`,
          onClick: () => {
            if (key === 'search') { state.search = ''; $('#search').value = ''; }
            else { state[key] = ''; const sel = $(`#filter-${key}`); if (sel) sel.value = ''; }
            render();
          }
        }, '×')
      );
      chips.appendChild(chip);
    });

    $('#clear-filters').hidden = items.length === 0;
  }

  function render() {
    grid.innerHTML = '';
    const filtered = courseData.courses.filter(matches);
    resultCountEl.textContent = filtered.length;
    filtered.forEach(c => grid.appendChild(buildCard(c)));
    $('#empty-state').hidden = filtered.length !== 0;
    grid.style.display = filtered.length === 0 ? 'none' : '';
    renderChips();
  }

  // ---------- Filters wiring ----------
  $('#search').addEventListener('input', (e) => {
    state.search = e.target.value.trim();
    render();
  });
  $('#filter-category').addEventListener('change', (e) => { state.category = e.target.value; render(); });
  $('#filter-vendor').addEventListener('change', (e) => { state.vendor = e.target.value; render(); });
  $('#filter-level').addEventListener('change', (e) => { state.level = e.target.value; render(); });

  function clearAll() {
    state.search = ''; state.category = ''; state.vendor = ''; state.level = '';
    $('#search').value = '';
    $('#filter-category').value = '';
    $('#filter-vendor').value = '';
    $('#filter-level').value = '';
    render();
  }
  $('#clear-filters').addEventListener('click', clearAll);
  $('#empty-clear').addEventListener('click', clearAll);

  // ---------- Modal ----------
  const modalEl = $('#modal');
  const modalDates = $('#modal-dates');
  const modalSuccess = $('#modal-success');
  let lastFocus = null;

  function openModal(course, contextLabel) {
    state.activeCourse = course;
    state.selectedDateIdx = 0;
    lastFocus = document.activeElement;

    $('#modal-vendor').textContent = course.vendor ? `${course.vendor} · ${course.category || ''}` : (contextLabel || '');
    $('#modal-title').textContent = course.title;
    $('#modal-sub').textContent = course.schedule
      ? 'Choose a schedule option and share your details. Final registration, payment, and confirmation process to be determined.'
      : 'Share your details so IG can confirm availability and the right next step.';

    modalDates.innerHTML = '';
    if (course.schedule && course.schedule.length) {
      course.schedule.forEach((s, i) => {
        const id = `mdate-${i}`;
        const row = el('label', {
          class: 'date-row' + (i === 0 ? ' selected' : ''),
          for: id,
          'data-testid': `date-row-${i}`,
        },
          el('input', {
            type: 'radio', name: 'mdate', id, value: String(i),
            checked: i === 0,
            onChange: () => selectDate(i),
          }),
          el('div', {},
            el('div', { class: 'd' }, fmtDateRange(s.start, s.end)),
            el('div', { class: 't' }, `${dayOfWeek(s.start, s.end)} · ${s.start_time}–${s.end_time} ${s.zone}`)
          )
        );
        modalDates.appendChild(row);
      });
    } else {
      // appointment-style lesson — no fixed schedule
      modalDates.appendChild(
        el('div', { class: 'date-row selected', 'data-testid': 'date-row-by-appointment' },
          el('div', {},
            el('div', { class: 'd' }, 'Availability to be confirmed'),
            el('div', { class: 't' }, course.schedule_note || 'IG will confirm the best scheduling or registration path.')
          )
        )
      );
    }

    modalSuccess.classList.remove('show');
    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('#m-name').focus(), 80);
  }

  function selectDate(i) {
    state.selectedDateIdx = i;
    $$('.date-row', modalDates).forEach((row, idx) => row.classList.toggle('selected', idx === i));
  }

  function closeModal() {
    modalEl.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-cancel').addEventListener('click', closeModal);
  modalEl.addEventListener('click', (e) => { if (e.target === modalEl) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl.classList.contains('open')) closeModal();
  });
  $('#modal-submit').addEventListener('click', () => {
    modalSuccess.classList.add('show');
    modalSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // ---------- Lessons section ----------
  const lessonGrid = $('#lesson-grid');
  lessons.forEach((l) => {
    const card = el('article', { class: 'lesson-card', 'data-testid': `card-lesson-${l.id}` },
      el('span', { class: 'badge' }, l.id === 'english-course' ? 'Program' : 'Class support'),
      el('h3', {}, l.title),
      el('div', { class: 'tag' }, l.tagline),
      el('ul', {}, ...l.bullets.map(b => el('li', {}, b))),
      el('div', { class: 'meta' },
        el('div', {}, el('strong', {}, 'Format: '), l.format),
        el('div', {}, el('strong', {}, 'Support: '), l.support),
        el('div', {}, el('strong', {}, 'Schedule: '), l.schedule_note),
      ),
      el('div', { class: 'price-block' },
        el('div', {},
          el('div', { class: 'price', 'data-testid': `text-lesson-price-${l.id}` }, l.price),
          el('div', { class: 'price-note' }, l.price_note)
        )
      ),
      el('button', {
        class: 'btn btn-primary',
        'data-testid': `button-lesson-check-${l.id}`,
        onClick: () => openModal({
          title: l.title,
          vendor: 'IG Educational Training',
          category: 'English & Technology',
          schedule: null,
          schedule_note: l.schedule_note,
        }, 'IG Educational Training · English & Technology'),
      }, 'Request Program Info')
    );
    lessonGrid.appendChild(card);
  });

  // ---------- Partner catalog ----------
  $('#partner-intro').textContent = partnerCatalog.intro;
  const partnerGrid = $('#partner-grid');
  partnerCatalog.categories.forEach((cat, i) => {
    const list = el('ul', { class: 'course-list' },
      ...cat.courses.map(c =>
        el('li', {},
          el('span', { class: 'nm' }, c.name),
          el('span', { class: 'pr' }, c.price)
        )
      )
    );
    const card = el('article', { class: 'partner-card', 'data-testid': `card-partner-${i}` },
      el('h3', {}, cat.name),
      el('div', { class: 'blurb' }, cat.blurb),
      el('details', { open: i < 2 ? '' : null },
        el('summary', { 'data-testid': `summary-partner-${i}` }, `${cat.courses.length} courses available`),
        list
      )
    );
    partnerGrid.appendChild(card);
  });

  // ---------- Mobile nav ----------
  const menuBtn = $('.menu-toggle');
  const mobileNav = $('#mobile-nav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  mobileNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // ---------- Initial paint ----------
  render();
})();
