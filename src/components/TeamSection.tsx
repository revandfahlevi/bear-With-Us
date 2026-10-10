import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '../types';
import { PawIcon } from './PawIcon';
import { Send, Check, Copy } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyUsername = (id: string, username: string) => {
    navigator.clipboard.writeText(username);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Pakai telegramUrl kalau diisi; kalau tidak, buat dari username hanya jika formatnya valid
  const getTelegramLink = (m: TeamMember): string | null => {
    if (m.telegramUrl) return m.telegramUrl;
    const u = m.telegramUsername.trim().replace(/^@+/, '');
    return /^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(u) ? `https://t.me/${u}` : null;
  };

  const founder: TeamMember = {
    id: 'founder-owner',
    name: '𝒔𝒉𝒆𝒚𝒚𝒊𝒏𝒆 ─⋆𐙚 💕',
    telegramUsername: '@sheyisavlly',
    position: 'Pendiri & Penjaga Utama Den',
    roleType: 'founder',
    bio: 'Sosok berjiwa hangat yang meletakkan pondasi pertama Bear With Us pada 19 September. Mengawasi kehangatan filosofi komunitas, menjaga perapian tetap menyala, dan memastikan setiap pengembara merasa memiliki rumah di sini.',
    badge: 'PENDIRI CC',
    avatarSeed: 'grizzly',
    favoriteQuote: '“Kami membangun den ini agar tak ada seorang pun yang harus mengarungi rimba roleplay sendirian.”',
    tags: ['Visi Komunitas', 'Mediasi Penuh Empati', 'Pembangunan Semesta'],
  };

  const staffList: TeamMember[] = [
    {
      id: 'admin-1',
      name: '✿❀𝐂𝐞𝐥𝐥𝐲𝐧 @awasnaksir',
      telegramUsername: '@cellynnvs',
      position: 'Admin Menfess,Bot,Ofc CH',
      roleType: 'admin',
      bio: 'Mengelola menfess, bot, dan channel resmi (Ofc CH) Bear With Us. Memastikan pesan menfess tersalurkan dengan aman, bot berjalan lancar, dan setiap pengumuman resmi sampai ke seluruh anggota.',
      badge: 'Admin',
      avatarSeed: 'panda',
      tags: ['Menfess', 'Bot Telegram', 'Channel Resmi'],
    },
    {
      id: 'admin-2',
      name: '៹ 𔘓 sᥒ᥆ᥕіᥣᥙᥴᥡ ! ꞌꞋ ࣪',
      telegramUsername: '@snowwheartt',
      position: 'Admin Seblink',
      roleType: 'admin',
      bio: 'Mengelola Seblink di Bear With Us. Menjaga agar setiap tautan dan informasi yang dibagikan tetap tertata, aman, dan sesuai dengan aturan komunitas.',
      badge: 'Admin',
      avatarSeed: 'icebear',
      tags: ['Seblink', 'Penataan Tautan', 'Operasional Rules'],
    },
    {
      id: 'admin-3',
      name: 'Arjuna',
      telegramUsername: '@junarap',
      position: 'Admin Memories',
      roleType: 'admin',
      bio: 'Penjaga Memories Bear With Us. Merawat arsip momen dan kenangan bersama agar kehangatan den tetap terkenang oleh seluruh anggota.',
      badge: 'Admin',
      avatarSeed: 'kodiak',
      tags: ['Memories', 'Arsip Momen', 'Dokumentasi Den'],
    },
    {
      id: 'admin-4',
      name: '𝒔𝒆𝒏𝒐𝒐',
      telegramUsername: '@afterrsen',
      position: 'Admin Security',
      roleType: 'admin',
      bio: 'Penjaga keamanan den. Memantau akun mencurigakan, spam, dan pelanggaran aturan agar Bear With Us tetap aman dan nyaman bagi seluruh anggota.',
      badge: 'Admin',
      avatarSeed: 'honey',
      tags: ['Keamanan Den', 'Anti-Spam', 'Penegakan Aturan'],
    },
    {
      id: 'staff-1',
      name: 'Bara Sagara',
      telegramUsername: '@Barasagara',
      position: 'Web Engineer & Staff IT',
      roleType: 'staff',
      bio: 'Membangun dan merawat website resmi Bear With Us beserta sistem pendukungnya, dari pendaftaran hingga layanan keluh kesah dan pamit. Juga membantu sebagai moderator.',
      badge: 'Moderator & Staff IT',
      avatarSeed: 'sketch',
      tags: ['Pengembangan Web', 'Sistem Bot', 'Dukungan Teknis'],
    },
  ];

  return (
    <section id="team" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#221812]/10">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="text-xs font-mono uppercase tracking-widest text-[#B85829] flex items-center gap-2 mb-2">
          <span>[DEWAN PENGURUS & MODERATOR]</span>
          <span aria-hidden="true">·</span>
          <span>COUNCIL DOSSIER</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#221812] tracking-tight [text-wrap:balance]">
          Sosok penjaga di balik kehangatan den.
        </h2>
        <p className="mt-3 text-base text-[#5F4E42] leading-relaxed max-w-2xl font-normal">
          Tim pengurus Bear With Us bekerja sukarela untuk memastikan alur roleplay berjalan seru, aturan ditegakkan secara adil, dan setiap suara anggota didengar.
        </p>
      </div>

      {/* Founder Spotlight Card (Authoritative Dossier) */}
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
        className="bg-[#F2EDE4] border border-[#221812]/15 p-6 sm:p-9 mb-8 transition-shadow duration-300 hover:shadow-xl hover:border-[#221812]/35"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#221812]/15">
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 bg-[#221812] text-white flex items-center justify-center font-bold text-sm rounded-sm shrink-0">
              <PawIcon size={20} color="#F8F5F0" />
            </span>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#B85829]">
                {founder.badge} · EST. 19 SEPTEMBER
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#221812] font-semibold mt-0.5">
                {founder.name}
              </h3>
              <p className="text-xs font-mono text-[#5F4E42] mt-0.5">
                {founder.position}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => copyUsername(founder.id, founder.telegramUsername)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#EBE4D8] text-[#221812] text-xs font-mono border border-[#221812]/15 rounded-sm transition-colors cursor-pointer"
            >
              {copiedId === founder.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2B4533]" />
                  <span>Tersalin: {founder.telegramUsername}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#B85829]" />
                  <span>{founder.telegramUsername}</span>
                </>
              )}
            </button>

            {getTelegramLink(founder) && (
              <a
                href={getTelegramLink(founder)!}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#221812] hover:bg-[#3D2E24] text-white rounded-sm transition-colors"
                title="Kirim pesan Telegram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <p className="text-sm sm:text-base text-[#5F4E42] leading-relaxed">
              {founder.bio}
            </p>
            <div className="text-xs font-mono text-[#917F72]">
              FOKUS: {founder.tags?.join(' · ')}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/70 p-4 border border-[#221812]/10 text-xs italic text-[#221812] font-serif">
            {founder.favoriteQuote}
          </div>
        </div>
      </motion.div>

      {/* Staff Council Directory Grid (Clean, Non-Toy) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {staffList.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.99 }}
            className="bg-white border border-[#221812]/15 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#221812]/40"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#917F72] border-b border-[#221812]/10 pb-2">
                <span className="font-bold text-[#B85829]">{member.badge}</span>
                <span>{member.roleType.toUpperCase()}</span>
              </div>

              <div>
                <h4 className="font-display font-semibold text-lg text-[#221812]">
                  {member.name}
                </h4>
                <p className="text-xs text-[#5F4E42] mt-0.5">
                  {member.position}
                </p>
              </div>

              <p className="text-xs text-[#5F4E42] leading-relaxed pt-1">
                {member.bio}
              </p>

              {member.tags && (
                <div className="pt-2 text-[11px] font-mono text-[#917F72]">
                  {member.tags.join(' · ')}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-[#221812]/10 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => copyUsername(member.id, member.telegramUsername)}
                className="font-mono text-[11px] text-[#221812] hover:text-[#B85829] transition-colors cursor-pointer flex items-center gap-1"
              >
                {copiedId === member.id ? (
                  <>
                    <Check className="w-3 h-3 text-[#2B4533]" />
                    <span className="text-[#2B4533]">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 opacity-60" />
                    <span>{member.telegramUsername}</span>
                  </>
                )}
              </button>

              {getTelegramLink(member) && (
                <a
                  href={getTelegramLink(member)!}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2AABEE] hover:underline font-mono text-[11px] flex items-center gap-1"
                >
                  Chat ↗
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};