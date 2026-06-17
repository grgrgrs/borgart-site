"""Regenerate data/site-data.js from the source JSON.
Run: python3 build_data.py
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).parent
src = ROOT / "data" / "courses.json"
dst = ROOT / "data" / "site-data.js"

course_data = json.loads(src.read_text())

# Static content for the "Online Partner Courses" section (mirrored from
# https://igmanagementgroup.org/courses/). Categories + a representative,
# de-duplicated list of courses (the live site repeats every entry as
# "Title <name>"; we keep the canonical row only).
partner_catalog = {
    "intro": (
        "IG Group is proud to launch a new line of high-quality educational "
        "and professional development programs — available both online and "
        "on-site. The catalog below mirrors the courses currently listed on "
        "igmanagementgroup.org/courses, delivered through our online training "
        "partners."
    ),
    "categories": [
        {
            "name": "OSHA Outreach Online Training",
            "blurb": "10 & 30 hour OSHA outreach courses, including bilingual options.",
            "courses": [
                {"name": "OSHA 10 & 30 Hour General Industry (Spanish) — with Free Study Guide", "price": "$215.00"},
                {"name": "OSHA 10 & 30 Hour Construction Safety (Spanish) — with Free Study Guide", "price": "$215.00"},
                {"name": "OSHA 10 Hour Construction (Spanish) — with Study Guide", "price": "$59.99"},
                {"name": "OSHA 10 Hour General Industry (Spanish) — with Study Guide", "price": "$59.99"},
            ],
        },
        {
            "name": "MSHA & Workplace First Aid",
            "blurb": "Mining safety refresher courses and workplace first-aid certification.",
            "courses": [
                {"name": "MSHA Part 46 8-Hour Surface Mining Refresher", "price": "$149.99"},
                {"name": "Workplace First Aid", "price": "$39.99"},
            ],
        },
        {
            "name": "Environmental Safety & OSHA",
            "blurb": "EM 385, HAZWOPER, stormwater, electrical and bilingual safety modules.",
            "courses": [
                {"name": "40-Hour EM 385-1-1 Training", "price": "$395.00"},
                {"name": "24-Hour EM 385-1-1 Training", "price": "$295.00"},
                {"name": "16-Hour EM 385-1-1 Training", "price": "$215.00"},
                {"name": "Stormwater Discharges & Permits in Construction", "price": "$90.00"},
                {"name": "OSHA 10 Hour General Industry — with Free Study Guide", "price": "$89.00"},
                {"name": "Capacitación De Ascensores Aéreos En Español", "price": "$79.00"},
                {"name": "Bill Judge 60/60 DOT Supervisor Training", "price": "$59.00"},
                {"name": "8-Hour HAZWOPER Supervisor Initial Training Online", "price": "$55.00"},
                {"name": "Arc Flash Electrical Safety Training Online", "price": "$49.00"},
                {"name": "Bloodborne Pathogens Training for Healthcare", "price": "$19.95"},
            ],
        },
        {
            "name": "Healthcare",
            "blurb": "Compliance and safety modules for clinical environments.",
            "courses": [
                {"name": "Operating Room Protocols for HCIRs", "price": "$24.95"},
                {"name": "Radiation Safety", "price": "$24.95"},
                {"name": "Fire Life Safety Training", "price": "$19.95"},
                {"name": "Hazard Communications in Healthcare", "price": "$14.95"},
                {"name": "Hazardous Materials in Healthcare", "price": "$14.95"},
                {"name": "Latex Allergy", "price": "$14.95"},
            ],
        },
        {
            "name": "HR, Ethics & Compliance",
            "blurb": "Workplace conduct, anti-money-laundering, anti-trust and customer-service training.",
            "courses": [
                {"name": "Anti-Money Laundering — Supervisors", "price": "$50.00"},
                {"name": "Anti-Trust (Comprehensive Course)", "price": "$30.00"},
                {"name": "Business Ethics — Advanced (Comprehensive Course)", "price": "$30.00"},
                {"name": "Business Conduct Practices", "price": "$25.00"},
                {"name": "Active Shooter Response", "price": "$24.99"},
                {"name": "1 to 1: Customer Service Success", "price": "$24.00"},
                {"name": "Anti-Trust: Bid-Rigging (Compliance Snapshot)", "price": "$10.00"},
                {"name": "Anti-Trust: Competitive Intelligence (Compliance Snapshot)", "price": "$10.00"},
                {"name": "Anti-Trust: Overview of Anti-Trust Issues (Compliance Snapshot)", "price": "$10.00"},
                {"name": "Active Shooter Awareness for Adults", "price": "Free"},
            ],
        },
        {
            "name": "Real Estate Education",
            "blurb": "Florida pre-licensing, post-licensing, and exam-prep packages.",
            "courses": [
                {"name": "Florida 63-Hour Premium Pre-License Package", "price": "$179.00"},
                {"name": "Florida Sales Post-License", "price": "$99.99"},
                {"name": "Florida Sales Pre-License", "price": "$99.00"},
                {"name": "Premium Florida Real Estate License Exam Prep", "price": "$79.99"},
            ],
        },
    ],
}

# English & Technology lessons (from Appointments / Educational Training archive)
lessons = [
    {
        "id": "english-course",
        "title": "English Course",
        "tagline": "12-month self-paced program with full teaching-staff support",
        "format": "Online platform, accessible anywhere/anytime",
        "support": "Office and/or virtual support included",
        "price": "$150",
        "price_note": "Written program detail; final payment flow to be confirmed",
        "schedule_note": "Program availability and support schedule to be confirmed",
        "bullets": [
            "Self-paced curriculum delivered through the IG online learning platform",
            "Full teaching-staff support, in-office or virtual",
            "12 months of access from your enrollment date",
            "Designed for adult learners building career-ready English",
        ],
    },
    {
        "id": "computer-cell-classes",
        "title": "Computer & Cell Phone Classes",
        "tagline": "Basic technology support for everyday digital skills",
        "format": "In-person and virtual sessions available",
        "support": "Small-group instruction with a dedicated trainer",
        "price": "By appointment",
        "price_note": "Pricing varies by program",
        "schedule_note": "45-minute session format; final scheduling flow to be confirmed",
        "bullets": [
            "Email, web browsing, and account-management basics",
            "Smartphone setup, messaging, and app essentials",
            "Online safety, password hygiene, and scam awareness",
            "Bring your own device or use ours during class",
        ],
    },
    {
        "id": "personalized-tech-lesson",
        "title": "Personalized Technology Lesson for Beginners",
        "tagline": "One-on-one tutoring tailored to your device and goals",
        "format": "1:1 in-office or virtual session",
        "support": "Dedicated instructor for the full session",
        "price": "By appointment",
        "price_note": "Contact us for current session fees",
        "schedule_note": "1-hour lesson format; final scheduling flow to be confirmed",
        "bullets": [
            "Bring any device — laptop, tablet, smartphone",
            "Custom agenda built around what you need to learn",
            "Step-by-step walkthroughs with patient, plain-language guidance",
            "Follow-up notes provided so you can practice between sessions",
        ],
    },
]

payload = {
    "courseData": course_data,
    "partnerCatalog": partner_catalog,
    "lessons": lessons,
}

dst.write_text(
    "// AUTO-GENERATED by build_data.py — do not edit by hand.\n"
    "// To update: edit data/courses.json (or partner/lesson sections in build_data.py),\n"
    "// then run: python3 build_data.py\n"
    "window.IG_DATA = " + json.dumps(payload, indent=2) + ";\n"
)
print(f"Wrote {dst}")
