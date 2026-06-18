import React from 'react';
import './HeroAnimation.css';

const HeroAnimation = () => {
    return (
        <div className="hero-animation-container">
            <svg viewBox="0 0 300 300" className="animated-svg" xmlns="http://www.w3.org/2000/svg">
                {/* Soft background circle */}
                <circle cx="150" cy="150" r="130" fill="#EFEBE9" />
                <circle cx="150" cy="150" r="110" fill="#F5EDE9" opacity="0.7" />

                {/* Beating Heart */}
                <path
                    className="heart-bg"
                    d="M150 240 C 20 130, 80 10, 150 80 C 220 10, 280 130, 150 240 Z"
                    fill="#6D4C41"
                    opacity="0.92"
                />
                {/* Heart sheen */}
                <path
                    className="heart-bg"
                    d="M120 110 C 115 90, 105 85, 100 100"
                    stroke="#A1887F"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                />

                {/* ECG / Pulse Line inside the heart */}
                <path
                    className="pulse-line"
                    d="M55 145 L100 145 L118 100 L160 200 L182 145 L245 145"
                    stroke="#FFFFFF"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Floating Medical Cross – top left */}
                <g className="floating-element-1">
                    <rect x="28" y="38" width="46" height="46" rx="12" fill="#FFFFFF" filter="url(#dropshadow)" />
                    <path d="M44 54 h14 v-8 h14 v14 h8 v14 h-8 v14 h-14 v-8 h-14 v-14 h-8 v-14 z"
                        fill="#6D4C41" transform="translate(0,-2)" />
                </g>

                {/* Floating Pill – top right */}
                <g className="floating-element-2" transform="translate(225, 42)">
                    <rect x="-6" y="-14" width="20" height="42" rx="10"
                        fill="#D7A96E" transform="rotate(-35)"
                        filter="url(#dropshadow)" />
                    <path d="M -6 -14 a 10 10 0 0 1 20 0 l 0 12 a 10 10 0 0 1 -20 0 z"
                        fill="#A1887F" transform="rotate(-35)" />
                </g>

                {/* Floating Stethoscope Icon – bottom right */}
                <g className="floating-element-3" transform="translate(220,195)">
                    <circle cx="0" cy="0" r="22" fill="#FFFFFF" filter="url(#dropshadow)" />
                    <text x="0" y="7" textAnchor="middle" fontSize="22" fill="#6D4C41">🩺</text>
                </g>

                {/* Drop shadow filter */}
                <defs>
                    <filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#6D4C41" floodOpacity="0.18" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default HeroAnimation;
