import React from "react";

import GitHubIcon from '../src/components/icons/GitHubIcon';
import DiscordIcon from "../src/components/icons/DiscordIcon";
import TelegramIcon from "../src/components/icons/TelegramIcon";
import MediumIcon from "../src/components/icons/MediumIcon";
import TwitterIcon from "../src/components/icons/TwitterIcon";
import FacebookIcon from "../src/components/icons/FacebookIcon";
import MailIcon from "../src/components/icons/MailIcon";

export const footerSocials = [
  { id: 0, component: <GitHubIcon />, href: 'https://github.com/dapplets', type: 'link' },
  { id: 1, component: <DiscordIcon />, href: 'https://discord.gg/YcxbkcyjMV ', type: 'link' },
  { id: 2, component: <TelegramIcon />, href: 'https://t.me/dapplets ', type: 'link' },
  { id: 3, component: <MediumIcon />, href: 'https://medium.com/@dapplets', type: 'link' },
  { id: 4, component: <TwitterIcon />, href: '', type: 'link' },
  { id: 5, component: <FacebookIcon />, href: '', type: 'link' },
  { id: 6, component: <MailIcon />, href: 'business@dapplets.org', type: 'email' },
];

export const footerLinks = [
  { id: 0, label: "Privacy Policy", href: '' },
  { id: 1, label: "Terms & Conditions", href: '' },
]