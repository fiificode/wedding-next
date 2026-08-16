"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import blueRosesCorner from "@/assets/blueRosesCorner.jpg";

const EASE = [0.76, 0, 0.24, 1];

/**
 * The RSVP "invitation" — two doors slide apart from the center to reveal
 * a formal invite card underneath. This replaces an earlier version of
 * this template that used a 3D flip; the reference site actually uses a
 * sliding double-door reveal, confirmed by watching it live.
 */
export default function DoubleDoorInvite() {
  const [open, setOpen] = useState(false);

  return (
    <div className="invite-wrap">
      <div
        className="invite-stage"
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen((o) => !o)}
        data-cursor-hover
      >
        <div className="invite-back-card">
          <Image
            src={blueRosesCorner}
            alt=""
            className="rose-corner rose-top-right"
            aria-hidden="true"
          />
          <Image
            src={blueRosesCorner}
            alt=""
            className="rose-corner rose-bottom-left"
            aria-hidden="true"
          />
          <div className="ib-logo">A &amp; A</div>
          <p className="ib-formal">
            IN THE PRESENCE OF GOD AND OUR LOVED ONES, WE,
          </p>
          <div className="ib-names">
            <span className="ib-names-line">Nana Kofi Akoi Barimah Opoku</span>
            <span className="ib-names-amp">&amp;</span>
            <span className="ib-names-line">Maame Afua Tweneboah Antwi</span>
          </div>
          <p className="ib-formal">
            JOYFULLY INVITE YOU TO WITNESS THE BEGINNING OF OUR NEW LIFE
            TOGETHER AS HUSBAND AND WIFE. JOIN US AS WE EXCHANGE OUR VOWS AND
            BLESS OUR MARRIAGE
          </p>
          <div className="ib-venue">
            <b>Presbyterian Church of Ghana · 1:00 PM</b>
            Kaneshie Congregation, Kaneshie, Accra
          </div>
          <div className="ib-flowers" aria-hidden="true">
            <svg viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M28,34 Q74,8 120,16 Q166,24 210,34"
                stroke="#b7924c"
                strokeWidth="1"
                opacity="0.55"
              />
              <ellipse
                cx="70"
                cy="14"
                rx="6"
                ry="2.6"
                fill="#b7924c"
                opacity="0.35"
                transform="rotate(-25 70 14)"
              />
              <ellipse
                cx="168"
                cy="21"
                rx="6"
                ry="2.6"
                fill="#b7924c"
                opacity="0.35"
                transform="rotate(25 168 21)"
              />
              <g stroke="#b7924c" strokeWidth="0.9" opacity="0.75">
                <circle cx="28" cy="29.5" r="2.3" />
                <circle cx="32.28" cy="32.61" r="2.3" />
                <circle cx="30.65" cy="37.64" r="2.3" />
                <circle cx="25.35" cy="37.64" r="2.3" />
                <circle cx="23.72" cy="32.61" r="2.3" />
              </g>
              <circle cx="28" cy="34" r="1.3" fill="#4d7291" />
              <g stroke="#b7924c" strokeWidth="1" opacity="0.85">
                <circle cx="120" cy="10.8" r="3" />
                <circle cx="124.95" cy="14.4" r="3" />
                <circle cx="123.06" cy="20.21" r="3" />
                <circle cx="116.94" cy="20.21" r="3" />
                <circle cx="115.05" cy="14.4" r="3" />
              </g>
              <circle cx="120" cy="16" r="1.6" fill="#4d7291" />
              <g stroke="#b7924c" strokeWidth="0.9" opacity="0.75">
                <circle cx="210" cy="29.5" r="2.3" />
                <circle cx="214.28" cy="32.61" r="2.3" />
                <circle cx="212.65" cy="37.64" r="2.3" />
                <circle cx="207.35" cy="37.64" r="2.3" />
                <circle cx="202.72" cy="32.61" r="2.3" />
              </g>
              <circle cx="210" cy="34" r="1.3" fill="#4d7291" />
            </svg>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=5.57413,-0.23494"
            target="_blank"
            rel="noopener noreferrer"
            className="ib-qr"
            onClick={(e) => e.stopPropagation()}
            aria-label="Open venue location in Google Maps"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/qr-venue.svg" alt="" width={56} height={56} />
            <span>SCAN FOR MAP</span>
          </a>
          {!open && <div className="ib-tap">TAP TO OPEN</div>}
        </div>

        <motion.div
          className="invite-door invite-door-left"
          animate={{ x: open ? "-100%" : "0%" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="door-inner">
            <div className="we-do">we</div>
            <div className="door-names">Akoi</div>
          </div>
        </motion.div>

        <motion.div
          className="invite-door invite-door-right"
          animate={{ x: open ? "100%" : "0%" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="door-inner">
            <div className="we-do">do</div>
            <div className="door-names">Afua</div>
          </div>
        </motion.div>
      </div>
      <div className="rsvp-hint">{open ? "TAP TO CLOSE" : "TAP TO OPEN"}</div>
    </div>
  );
}
