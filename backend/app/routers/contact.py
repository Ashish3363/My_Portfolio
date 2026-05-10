import logging
import smtplib
from email.message import EmailMessage

from fastapi import APIRouter, HTTPException

from ..config import settings
from ..schemas import ContactMessage, ContactResponse

logger = logging.getLogger("portfolio.contact")

router = APIRouter(prefix="/api", tags=["contact"])


def _send_email(payload: ContactMessage) -> None:
    """Send the contact message via SMTP if configured; otherwise just log it."""
    if not settings.smtp_host or not settings.smtp_from:
        logger.info(
            "Contact message received (SMTP not configured) — name=%s email=%s message=%r",
            payload.name,
            payload.email,
            payload.message,
        )
        return

    msg = EmailMessage()
    msg["Subject"] = f"Portfolio contact from {payload.name}"
    msg["From"] = settings.smtp_from
    msg["To"] = settings.smtp_to
    msg["Reply-To"] = payload.email
    msg.set_content(
        f"Name: {payload.name}\nEmail: {payload.email}\n\n{payload.message}"
    )

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as smtp:
        smtp.starttls()
        if settings.smtp_username and settings.smtp_password:
            smtp.login(settings.smtp_username, settings.smtp_password)
        smtp.send_message(msg)


@router.post("/contact", response_model=ContactResponse)
def submit_contact(payload: ContactMessage) -> ContactResponse:
    try:
        _send_email(payload)
    except Exception as exc:
        logger.exception("Failed to deliver contact message")
        raise HTTPException(status_code=502, detail="Could not deliver message") from exc
    return ContactResponse(ok=True, detail="Message received")
