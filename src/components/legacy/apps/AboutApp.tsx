"use client";

import { Plus, Search, Share2, Trash2, Undo2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLegacyUiLocale } from "../legacy-locale-context";
import { LEGACY_IOS_FONT_FAMILY } from "../ui/legacy-status-data";

const PAPER_TEXTURE_ASSET_PATH = "/figma/legacy-notes/paper-texture.png";
const LEATHER_NAV_ASSET_PATH = "/figma/legacy-notes/leather-nav.png";
const DRILL_IN_ASSET_PATH = "/figma/legacy-notes/drill-in.png";
const NOTES_HANDWRITING_FONT =
	'"Noteworthy", "Marker Felt", "Comic Sans MS", cursive';

type Locale = "en" | "ru";
type AccountId = "all" | "device" | "icloud";
type Screen = "accounts" | "list" | "detail";
type NoteRecord = {
	id: string;
	accountId: AccountId;
	title: Record<Locale, string>;
	listDate: Record<Locale, string>;
	headerDay: Record<Locale, string>;
	headerDate: Record<Locale, string>;
	headerTime: Record<Locale, string>;
	body: Record<Locale, string[]>;
};

const COPY = {
	en: {
		accounts: "Accounts",
		notes: "Notes",
		search: "Search",
		deleteNote: "Delete Note",
		cancel: "Cancel",
		share: "Share",
		trash: "Delete",
		next: "Next note",
		searchNotes: "Search notes",
		newNote: "New note",
		newNoteBody: ["Tap to start writing..."],
	},
	ru: {
		accounts: "Аккаунты",
		notes: "Заметки",
		search: "Поиск",
		deleteNote: "Удалить заметку",
		cancel: "Отмена",
		share: "Поделиться",
		trash: "Удалить",
		next: "Следующая заметка",
		searchNotes: "Искать в заметках",
		newNote: "Новая заметка",
		newNoteBody: ["Нажмите, чтобы начать писать..."],
	},
} as const;

const ACCOUNT_LABELS: Record<AccountId, Record<Locale, string>> = {
	all: { en: "All Notes", ru: "Все заметки" },
	device: { en: "On My iPhone", ru: "На iPhone" },
	icloud: { en: "iCloud", ru: "iCloud" },
};

const INITIAL_NOTES: NoteRecord[] = [
	{
		id: "science-project",
		accountId: "device",
		title: {
			en: "Science project: Solar system",
			ru: "Проект по науке: Солнечная система",
		},
		listDate: { en: "9:41 AM", ru: "9:41" },
		headerDay: { en: "Today", ru: "Сегодня" },
		headerDate: { en: "Sep 12", ru: "12 сент." },
		headerTime: { en: "9:41 AM", ru: "9:41" },
		body: {
			en: [
				"Science project: Solar system",
				"",
				"Things to do before creating:",
				"- Research the planets",
				"- Buy acrylic paint set",
				"- Make paper mache paste",
			],
			ru: [
				"Проект по науке: Солнечная система",
				"",
				"Что нужно сделать до сборки:",
				"- Изучить планеты",
				"- Купить набор акриловых красок",
				"- Сделать клейстер для папье-маше",
			],
		},
	},
	{
		id: "book-list",
		accountId: "icloud",
		title: {
			en: "Book list",
			ru: "Список книг",
		},
		listDate: { en: "Yesterday", ru: "Вчера" },
		headerDay: { en: "Yesterday", ru: "Вчера" },
		headerDate: { en: "Sep 11", ru: "11 сент." },
		headerTime: { en: "8:12 PM", ru: "20:12" },
		body: {
			en: [
				"Book list",
				"",
				"- Dieter Rams: As Little Design as Possible",
				"- The Design of Everyday Things",
				"- Refactoring UI",
				"- Working in Public",
			],
			ru: [
				"Список книг",
				"",
				"- Dieter Rams: As Little Design as Possible",
				"- The Design of Everyday Things",
				"- Refactoring UI",
				"- Working in Public",
			],
		},
	},
	{
		id: "design-ideas",
		accountId: "device",
		title: {
			en: "Design ideas and notes",
			ru: "Идеи по дизайну и заметки",
		},
		listDate: { en: "Sep 5, 2012", ru: "5 сент. 2012" },
		headerDay: { en: "Wednesday", ru: "Среда" },
		headerDate: { en: "Sep 5", ru: "5 сент." },
		headerTime: { en: "11:08 AM", ru: "11:08" },
		body: {
			en: [
				"Design ideas and notes",
				"",
				"- Keep the dock untouched",
				"- Match old iOS chrome instead of modern cards",
				"- Use real states: list, note, delete sheet",
				"- Let the textures do some of the work",
			],
			ru: [
				"Идеи по дизайну и заметки",
				"",
				"- Не трогать док",
				"- Повторить старый iOS chrome, а не современные карточки",
				"- Делать настоящие состояния: список, заметка, удаление",
				"- Использовать текстуры, а не плоские заливки",
			],
		},
	},
];

function buttonSurfaceStyle() {
	return {
		backgroundImage:
			"linear-gradient(180deg,rgba(255,255,255,0.14) 0%,rgba(255,255,255,0.02) 45%,rgba(0,0,0,0.18) 100%)",
	};
}

function leatherStyle() {
	return {
		backgroundImage: `url(${LEATHER_NAV_ASSET_PATH})`,
		backgroundPosition: "top left",
		backgroundSize: "153.6px 153.6px",
	};
}

function paperStyle(lineHeight: number) {
	return {
		backgroundColor: "#f3eb95",
		backgroundImage: `url(${PAPER_TEXTURE_ASSET_PATH}), repeating-linear-gradient(180deg, rgba(255,255,255,0) 0, rgba(255,255,255,0) ${
			lineHeight - 1
		}px, rgba(56,84,135,0.28) ${lineHeight - 1}px, rgba(56,84,135,0.28) ${lineHeight}px)`,
		backgroundPosition: "top left, top left",
		backgroundSize: "153.6px 153.6px, auto",
	};
}

function NotesButton({
	children,
	onClick,
	ariaLabel,
	className,
}: {
	children: React.ReactNode;
	onClick?: () => void;
	ariaLabel: string;
	className?: string;
}) {
	return (
		<button
			type="button"
			aria-label={ariaLabel}
			className={`relative flex h-[29px] items-center justify-center overflow-hidden rounded-[5px] border border-black/45 px-[10px] shadow-[0_0.5px_0_rgba(255,255,255,0.2),inset_0_0_1px_rgba(0,0,0,0.9),inset_0_1px_0.5px_rgba(0,0,0,0.4),inset_0_0_5px_rgba(0,0,0,0.35)] active:brightness-90 ${className ?? ""}`}
			style={buttonSurfaceStyle()}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

function NotesPlusButton({
	onClick,
	ariaLabel,
}: {
	onClick: () => void;
	ariaLabel: string;
}) {
	return (
		<NotesButton
			ariaLabel={ariaLabel}
			className="min-w-[33px] px-0"
			onClick={onClick}
		>
			<Plus
				className="h-[18px] w-[18px] text-white drop-shadow-[0_-1px_0_rgba(0,0,0,0.45)]"
				strokeWidth={2.25}
			/>
		</NotesButton>
	);
}

function NotesBackButton({
	label,
	onClick,
	ariaLabel,
}: {
	label: string;
	onClick: () => void;
	ariaLabel: string;
}) {
	return (
		<button
			type="button"
			aria-label={ariaLabel}
			className="group relative flex h-[29px] items-center pl-[12px] active:brightness-90"
			onClick={onClick}
		>
			<span className="absolute top-0 left-0 h-[29px] w-[14px] overflow-hidden">
				<span
					className="absolute top-1/2 left-[1px] h-[19px] w-[19px] -translate-y-1/2 rotate-45 rounded-[4px] border border-black/45 shadow-[0_0.5px_0_rgba(255,255,255,0.2),inset_0_0_1px_rgba(0,0,0,0.9),inset_0_1px_0.5px_rgba(0,0,0,0.4),inset_0_0_5px_rgba(0,0,0,0.35)]"
					style={buttonSurfaceStyle()}
				/>
			</span>
			<span
				className="relative flex h-[29px] items-center overflow-hidden rounded-r-[5px] border border-black/45 pr-[8px] pl-[10px] text-[12px] text-white [text-shadow:0_-1px_0_rgba(0,0,0,0.45)]"
				style={{
					...buttonSurfaceStyle(),
					fontFamily: LEGACY_IOS_FONT_FAMILY,
					fontWeight: 700,
				}}
			>
				{label}
			</span>
		</button>
	);
}

function NotesNavBar({
	title,
	left,
	onTitleClick,
	right,
}: {
	title: string;
	left?: React.ReactNode;
	onTitleClick?: () => void;
	right?: React.ReactNode;
}) {
	const titleNode = (
		<span
			className="max-w-[190px] truncate text-[20px] text-white [text-shadow:0_-1px_0_rgba(0,0,0,0.45)]"
			style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
		>
			{title}
		</span>
	);

	return (
		<div
			className="absolute inset-x-0 top-0 h-[44px] overflow-hidden border-[#4f3327] border-b shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
			style={leatherStyle()}
		>
			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.04)_40%,rgba(0,0,0,0.2))]" />
			<div className="absolute inset-0 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]" />

			<div className="absolute top-[7px] left-[5px] z-10">{left}</div>
			<div className="absolute top-[7px] right-[5px] z-10">{right}</div>
			<div className="absolute inset-x-0 top-[9px] flex justify-center">
				{onTitleClick ? (
					<button
						type="button"
						className="active:brightness-90"
						onClick={onTitleClick}
						aria-label={title}
					>
						{titleNode}
					</button>
				) : (
					titleNode
				)}
			</div>
		</div>
	);
}

function NotesSearchBar({
	value,
	onChange,
	placeholder,
	inputRef,
}: {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	inputRef: React.RefObject<HTMLInputElement | null>;
}) {
	return (
		<div
			className="absolute inset-x-0 top-[44px] h-[44px] overflow-hidden border-[#4f3327] border-b shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
			style={leatherStyle()}
		>
			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.28))]" />
			<div className="relative px-[5px] pt-[7px]">
				<div className="relative flex h-[30px] items-center gap-[4px] overflow-hidden rounded-[15px] border border-[#2b2e3a] bg-white pr-[5px] pl-[7px] shadow-[inset_0_2px_3px_rgba(0,0,0,0.5)]">
					<Search
						className="h-[16px] w-[16px] text-[#9a9a9a]"
						strokeWidth={2.2}
					/>
					<input
						ref={inputRef}
						aria-label={placeholder}
						className="h-full min-w-0 flex-1 border-0 bg-transparent text-[#4d4d4d] text-[14px] outline-none placeholder:text-[#b2b2b2]"
						placeholder={placeholder}
						style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
						value={value}
						onChange={(event) => onChange(event.target.value)}
					/>
				</div>
			</div>
		</div>
	);
}

function PaperBackground({
	lineHeight,
	children,
	showMargin = false,
}: {
	lineHeight: number;
	children: React.ReactNode;
	showMargin?: boolean;
}) {
	return (
		<div
			className="relative h-full overflow-hidden"
			style={paperStyle(lineHeight)}
		>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-[150px] bg-[linear-gradient(180deg,rgba(255,255,255,0.52),rgba(255,255,255,0))]" />
			{showMargin ? (
				<>
					<div className="pointer-events-none absolute inset-y-0 left-[21px] w-px bg-[#aa5830]" />
					<div className="pointer-events-none absolute inset-y-0 left-[23px] w-px bg-[#aa5830]" />
				</>
			) : null}
			{children}
		</div>
	);
}

function AccountsView({
	locale,
	onOpenAccount,
}: {
	locale: Locale;
	onOpenAccount: (accountId: AccountId) => void;
}) {
	const accounts: AccountId[] = ["all", "device", "icloud"];

	return (
		<PaperBackground lineHeight={44}>
			<div className="px-[10px] pt-[16px]">
				<div className="overflow-hidden rounded-[8px] border border-[rgba(170,88,48,0.5)] bg-[#f7f7f7] shadow-[0_0.5px_0.5px_rgba(255,255,255,0.8),inset_0_1px_1px_rgba(0,0,0,0.1)]">
					{accounts.map((accountId, index) => {
						const isLast = index === accounts.length - 1;
						return (
							<button
								type="button"
								key={accountId}
								onClick={() => onOpenAccount(accountId)}
								className={`relative flex h-[44px] w-full items-center bg-[#f7f7f7] px-[10px] text-left active:bg-[#efe8d0] ${
									isLast ? "" : "border-[rgba(170,88,48,0.8)] border-b"
								}`}
							>
								<span
									className="flex-1 truncate text-[17px] text-black"
									style={{
										fontFamily: LEGACY_IOS_FONT_FAMILY,
										fontWeight: 700,
									}}
								>
									{ACCOUNT_LABELS[accountId][locale]}
								</span>
								<span className="relative h-[14px] w-[9px] shrink-0">
									<Image
										alt=""
										src={DRILL_IN_ASSET_PATH}
										fill
										sizes="9px"
										className="object-contain"
										unoptimized
									/>
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</PaperBackground>
	);
}

function NotesListView({
	locale,
	notes,
	onOpenNote,
}: {
	locale: Locale;
	notes: NoteRecord[];
	onOpenNote: (noteId: string) => void;
}) {
	return (
		<PaperBackground lineHeight={44}>
			<div className="h-full overflow-y-auto pt-[10px]">
				{notes.map((note) => (
					<button
						type="button"
						key={note.id}
						onClick={() => onOpenNote(note.id)}
						className="flex h-[44px] w-full items-center border-[rgba(56,84,135,0.3)] border-b px-[10px] text-left active:bg-white/20"
					>
						<span
							className="min-w-0 flex-1 truncate text-[#aa5830] text-[18px]"
							style={{ fontFamily: NOTES_HANDWRITING_FONT, fontWeight: 700 }}
						>
							{note.title[locale]}
						</span>
						<span
							className="mr-[20px] shrink-0 text-[#385487]/80 text-[14px]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
						>
							{note.listDate[locale]}
						</span>
						<span className="relative h-[14px] w-[9px] shrink-0">
							<Image
								alt=""
								src={DRILL_IN_ASSET_PATH}
								fill
								sizes="9px"
								className="object-contain"
								unoptimized
							/>
						</span>
					</button>
				))}
				{notes.length === 0 ? (
					<div className="flex h-[176px] items-center justify-center px-8">
						<p
							className="text-center text-[#6e6e6e] text-[15px]"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}
						>
							{locale === "ru" ? "Ничего не найдено." : "No matching notes."}
						</p>
					</div>
				) : null}
			</div>
		</PaperBackground>
	);
}

function NoteDetailView({
	locale,
	note,
	onShare,
	onDelete,
	onNext,
}: {
	locale: Locale;
	note: NoteRecord;
	onShare: () => void;
	onDelete: () => void;
	onNext: () => void;
}) {
	return (
		<PaperBackground lineHeight={24} showMargin>
			<div className="relative flex h-full flex-col">
				<div className="relative flex-1 overflow-y-auto px-[8px] py-[8px] pl-[32px]">
					<div className="flex items-start gap-[10px] text-[#aa5830] text-[14px]">
						<p
							className="flex-1"
							style={{ fontFamily: LEGACY_IOS_FONT_FAMILY, fontWeight: 700 }}
						>
							{note.headerDay[locale]}
						</p>
						<p style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}>
							{note.headerDate[locale]}
						</p>
						<p style={{ fontFamily: LEGACY_IOS_FONT_FAMILY }}>
							{note.headerTime[locale]}
						</p>
					</div>

					<div
						className="mt-[6px] space-y-0 text-[18px] text-black leading-[24px]"
						style={{ fontFamily: NOTES_HANDWRITING_FONT, fontWeight: 700 }}
					>
						{note.body[locale].map((line, index) => (
							<p key={`${note.id}-line-${index + 1}`}>{line || "\u00A0"}</p>
						))}
					</div>
				</div>

				<div className="relative flex h-[52px] items-center justify-between px-[40px] pt-[10px] pb-[12px] text-[#aa5830]">
					<Search className="h-[24px] w-[24px] opacity-40" strokeWidth={1.9} />
					<button
						type="button"
						aria-label={COPY[locale].share}
						className="active:scale-[0.95]"
						onClick={onShare}
					>
						<Share2 className="h-[24px] w-[24px]" strokeWidth={1.9} />
					</button>
					<button
						type="button"
						aria-label={COPY[locale].trash}
						className="active:scale-[0.95]"
						onClick={onDelete}
					>
						<Trash2 className="h-[24px] w-[24px]" strokeWidth={1.9} />
					</button>
					<button
						type="button"
						aria-label={COPY[locale].next}
						className="active:scale-[0.95]"
						onClick={onNext}
					>
						<Undo2
							className="h-[24px] w-[24px] -scale-x-100"
							strokeWidth={1.9}
						/>
					</button>
				</div>
			</div>
		</PaperBackground>
	);
}

function DeleteSheet({
	locale,
	onDelete,
	onCancel,
}: {
	locale: Locale;
	onDelete: () => void;
	onCancel: () => void;
}) {
	return (
		<>
			<motion.button
				type="button"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="absolute inset-0 z-40 bg-black/50"
				onClick={onCancel}
				aria-label={COPY[locale].cancel}
			/>
			<motion.div
				initial={{ y: 80, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 80, opacity: 0 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
				className="absolute inset-x-0 bottom-0 z-50 overflow-hidden bg-black/60 px-[10px] pt-[10px] pb-[14px] shadow-[0_-1px_0_rgba(0,0,0,0.8),0_-2px_2px_rgba(0,0,0,0.2)]"
			>
				<div className="pointer-events-none absolute inset-x-0 top-0 h-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0))]" />
				<div className="space-y-[5px]">
					<div className="rounded-[12px] bg-black/30 p-[3px] shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,0.8)]">
						<button
							type="button"
							onClick={onDelete}
							className="relative h-[39px] w-full overflow-hidden rounded-[9px] bg-[#d40c0d] pb-[2px] text-white shadow-[0_2px_2px_rgba(0,0,0,0.5),inset_0_0_0_0.5px_rgba(255,255,255,0.1)] active:brightness-90"
						>
							<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0)_70%,rgba(255,255,255,0.3))]" />
							<span
								className="relative z-10 text-[20px] [text-shadow:0_-1px_0_rgba(0,0,0,0.2)]"
								style={{
									fontFamily: LEGACY_IOS_FONT_FAMILY,
									fontWeight: 700,
								}}
							>
								{COPY[locale].deleteNote}
							</span>
						</button>
					</div>
					<div className="rounded-[12px] bg-black/30 p-[3px] shadow-[0_1px_0_rgba(255,255,255,0.2),inset_0_1px_2px_rgba(0,0,0,0.8)]">
						<button
							type="button"
							onClick={onCancel}
							className="relative h-[39px] w-full overflow-hidden rounded-[9px] bg-black/60 pb-[2px] text-white shadow-[0_2px_2px_rgba(0,0,0,0.5),inset_0_0_0_0.5px_rgba(255,255,255,0.1)] active:brightness-90"
						>
							<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0)_70%,rgba(255,255,255,0.1))]" />
							<span
								className="relative z-10 text-[20px] [text-shadow:0_-1px_0_rgba(0,0,0,0.4)]"
								style={{
									fontFamily: LEGACY_IOS_FONT_FAMILY,
									fontWeight: 700,
								}}
							>
								{COPY[locale].cancel}
							</span>
						</button>
					</div>
				</div>
			</motion.div>
		</>
	);
}

export default function AboutApp() {
	const locale = useLegacyUiLocale();
	const copy = COPY[locale];
	const [screen, setScreen] = useState<Screen>("list");
	const [selectedAccount, setSelectedAccount] = useState<AccountId>("all");
	const [selectedNoteId, setSelectedNoteId] = useState<string>(
		INITIAL_NOTES[0]?.id ?? "",
	);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);
	const [notes, setNotes] = useState(INITIAL_NOTES);
	const [draftCount, setDraftCount] = useState(0);
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (screen === "list" && isSearchOpen) {
			searchInputRef.current?.focus();
		}
	}, [screen, isSearchOpen]);

	const accountNotes = notes.filter((note) =>
		selectedAccount === "all" ? true : note.accountId === selectedAccount,
	);
	const searchableNotes = accountNotes.filter((note) => {
		const haystack = [
			note.title[locale],
			...note.body[locale],
			note.headerDay[locale],
			note.headerDate[locale],
		]
			.join(" ")
			.toLowerCase();
		return haystack.includes(searchQuery.toLowerCase());
	});
	const selectedNote =
		notes.find((note) => note.id === selectedNoteId) ?? notes[0] ?? null;

	const openAccount = (accountId: AccountId) => {
		setSelectedAccount(accountId);
		setScreen("list");
		setIsSearchOpen(false);
		setSearchQuery("");

		const firstNote = notes.find((note) =>
			accountId === "all" ? true : note.accountId === accountId,
		);
		if (firstNote) {
			setSelectedNoteId(firstNote.id);
		}
	};

	const openNote = (noteId: string) => {
		setSelectedNoteId(noteId);
		setScreen("detail");
		setIsDeleteSheetOpen(false);
	};

	const createNote = () => {
		const nextDraftCount = draftCount + 1;
		const noteId = `draft-${nextDraftCount}`;
		const draftNote: NoteRecord = {
			id: noteId,
			accountId: selectedAccount === "all" ? "device" : selectedAccount,
			title: {
				en: copy.newNote,
				ru: copy.newNote,
			},
			listDate: { en: "Now", ru: "Сейчас" },
			headerDay: { en: "Today", ru: "Сегодня" },
			headerDate: { en: "Sep 12", ru: "12 сент." },
			headerTime: { en: "9:41 AM", ru: "9:41" },
			body: {
				en: [copy.newNote, "", ...COPY.en.newNoteBody],
				ru: [copy.newNote, "", ...COPY.ru.newNoteBody],
			},
		};

		setDraftCount(nextDraftCount);
		setNotes((currentNotes) => [draftNote, ...currentNotes]);
		setSelectedAccount("all");
		setSelectedNoteId(noteId);
		setScreen("detail");
		setIsSearchOpen(false);
		setSearchQuery("");
	};

	const deleteSelectedNote = () => {
		if (!selectedNote) {
			return;
		}

		setNotes((currentNotes) =>
			currentNotes.filter((note) => note.id !== selectedNote.id),
		);
		setIsDeleteSheetOpen(false);
		setScreen("list");
		const nextNotes = notes.filter((note) => note.id !== selectedNote.id);
		const replacement =
			nextNotes.find((note) =>
				selectedAccount === "all" ? true : note.accountId === selectedAccount,
			) ?? nextNotes[0];
		if (replacement) {
			setSelectedNoteId(replacement.id);
		}
	};

	const openNextNote = () => {
		if (!selectedNote || accountNotes.length < 2) {
			return;
		}

		const currentIndex = accountNotes.findIndex(
			(note) => note.id === selectedNote.id,
		);
		const nextNote = accountNotes[(currentIndex + 1) % accountNotes.length];
		if (!nextNote) {
			return;
		}
		setSelectedNoteId(nextNote.id);
	};

	const shareSelectedNote = () => {
		if (!selectedNote) {
			return;
		}

		const subject = encodeURIComponent(selectedNote.title[locale]);
		const body = encodeURIComponent(selectedNote.body[locale].join("\n"));
		window.open(
			`mailto:?subject=${subject}&body=${body}`,
			"_blank",
			"noreferrer",
		);
	};

	const noteCountTitle = `${copy.notes} (${accountNotes.length})`;
	const detailTitle = selectedNote?.title[locale] ?? copy.notes;
	const detailTitleLabel =
		detailTitle.length > 18 ? `${detailTitle.slice(0, 18)}...` : detailTitle;

	return (
		<div className="relative h-full overflow-hidden bg-black text-black">
			<div className="absolute inset-x-0 top-[20px] bottom-0">
				<NotesNavBar
					title={
						screen === "accounts"
							? copy.accounts
							: screen === "detail"
								? detailTitleLabel
								: noteCountTitle
					}
					onTitleClick={
						screen === "list"
							? () => setIsSearchOpen((current) => !current)
							: undefined
					}
					left={
						screen === "accounts" ? undefined : screen === "detail" ? (
							<NotesBackButton
								ariaLabel={copy.notes}
								label={copy.notes}
								onClick={() => {
									setScreen("list");
									setIsDeleteSheetOpen(false);
								}}
							/>
						) : (
							<NotesBackButton
								ariaLabel={copy.accounts}
								label={copy.accounts}
								onClick={() => {
									setScreen("accounts");
									setIsSearchOpen(false);
									setSearchQuery("");
								}}
							/>
						)
					}
					right={
						<NotesPlusButton ariaLabel={copy.newNote} onClick={createNote} />
					}
				/>

				{screen === "list" && isSearchOpen ? (
					<NotesSearchBar
						inputRef={searchInputRef}
						onChange={setSearchQuery}
						placeholder={copy.search}
						value={searchQuery}
					/>
				) : null}

				<div
					className={`absolute inset-x-0 bottom-0 ${
						screen === "list" && isSearchOpen ? "top-[88px]" : "top-[44px]"
					}`}
				>
					<AnimatePresence mode="wait">
						{screen === "accounts" ? (
							<motion.div
								key="notes-accounts"
								initial={{ opacity: 0, x: -18 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 18 }}
								transition={{ duration: 0.18, ease: "easeOut" }}
								className="h-full"
							>
								<AccountsView locale={locale} onOpenAccount={openAccount} />
							</motion.div>
						) : screen === "detail" && selectedNote ? (
							<motion.div
								key={`notes-detail-${selectedNote.id}`}
								initial={{ opacity: 0, x: 18 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -18 }}
								transition={{ duration: 0.18, ease: "easeOut" }}
								className="h-full"
							>
								<NoteDetailView
									locale={locale}
									note={selectedNote}
									onDelete={() => setIsDeleteSheetOpen(true)}
									onNext={openNextNote}
									onShare={shareSelectedNote}
								/>
							</motion.div>
						) : (
							<motion.div
								key={`notes-list-${selectedAccount}-${isSearchOpen ? "search" : "plain"}`}
								initial={{ opacity: 0, x: 18 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -18 }}
								transition={{ duration: 0.18, ease: "easeOut" }}
								className="h-full"
							>
								<NotesListView
									locale={locale}
									notes={searchableNotes}
									onOpenNote={openNote}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			<AnimatePresence>
				{screen === "detail" && isDeleteSheetOpen ? (
					<DeleteSheet
						locale={locale}
						onCancel={() => setIsDeleteSheetOpen(false)}
						onDelete={deleteSelectedNote}
					/>
				) : null}
			</AnimatePresence>
		</div>
	);
}
