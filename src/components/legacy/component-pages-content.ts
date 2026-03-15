import type { Locale } from "~/i18n";

export type InlineSegment = {
	type: "text" | "code";
	value: string;
};

export function getLocale(locale: string): Locale {
	return locale === "ru" ? "ru" : "en";
}

export function getLocalePrefix(locale: Locale) {
	return locale === "ru" ? "/ru" : "";
}

export function getComponentsHubPath(_locale: Locale) {
	return `/components`;
}

export function getLegacyWheelPickerHubPath(_locale: Locale) {
	return `/components/legacy-wheel-picker`;
}

export const LEGACY_WHEEL_PICKER_URLS = {
	direct: "https://sabraman.ru/r/legacy-wheel-picker.json",
	registry: "https://sabraman.ru/r/registry.json",
	docs: "https://sabraman.ru/components/legacy-wheel-picker",
} as const;

export const LEGACY_WHEEL_PICKER_INSTALL_COMMANDS = {
	bun: `bunx --bun shadcn@latest add ${LEGACY_WHEEL_PICKER_URLS.direct}`,
	npm: `npx shadcn@latest add ${LEGACY_WHEEL_PICKER_URLS.direct}`,
	pnpm: `pnpm dlx shadcn@latest add ${LEGACY_WHEEL_PICKER_URLS.direct}`,
	yarn: `yarn dlx shadcn@latest add ${LEGACY_WHEEL_PICKER_URLS.direct}`,
} as const;

export const LEGACY_WHEEL_PICKER_ALIAS_COMMANDS = {
	bun: "bunx --bun shadcn@latest add @sabraman/legacy-wheel-picker",
	npm: "npx shadcn@latest add @sabraman/legacy-wheel-picker",
	pnpm: "pnpm dlx shadcn@latest add @sabraman/legacy-wheel-picker",
	yarn: "yarn dlx shadcn@latest add @sabraman/legacy-wheel-picker",
} as const;

export const LEGACY_WHEEL_PICKER_DEPENDENCY_COMMANDS = {
	bun: "bun add @ncdai/react-wheel-picker",
	npm: "npm install @ncdai/react-wheel-picker",
	pnpm: "pnpm add @ncdai/react-wheel-picker",
	yarn: "yarn add @ncdai/react-wheel-picker",
} as const;

export const LEGACY_WHEEL_PICKER_COMPONENTS_JSON_SNIPPET = `{
  "registries": {
    "@sabraman": "https://sabraman.ru/r/{name}.json"
  }
}`;

export const LEGACY_WHEEL_PICKER_USAGE_SNIPPET = `"use client";

import { useState } from "react";
import { LegacyPickerColumn, LegacyPickerContainer } from "@/components/legacy-wheel-picker";

const frameworkOptions = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular", disabled: true },
  { label: "Svelte", value: "svelte" },
];

export function LegacyBasicPickerDemo() {
  const [value, setValue] = useState("react");

  return (
    <div className="flex w-full max-w-[320px] flex-col items-center gap-6">
      <LegacyPickerContainer className="w-full">
        <LegacyPickerColumn
          align="center"
          fontSize={22}
          onValueChange={setValue}
          options={frameworkOptions}
          value={value}
        />
      </LegacyPickerContainer>
    </div>
  );
}`;

export const LEGACY_WHEEL_PICKER_MULTIPLE_SNIPPET = `"use client";

import { useState } from "react";
import { LegacyPickerColumn, LegacyPickerContainer } from "@/components/legacy-wheel-picker";

const hours = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1,
}));

const minutes = Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, "0"),
  value: i,
}));

const meridiem = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

export function TimePickerExample() {
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(41);
  const [ampm, setAmpm] = useState("AM");

  return (
    <LegacyPickerContainer
      className="w-full relative overflow-hidden shrink-0"
      frameWidth="100%"
      width="100%"
    >
      <div className="relative z-[3] flex flex-[1.2] shrink-0 border-r border-[#000]/20 shadow-[1px_0_0_0_rgba(255,255,255,0.3)]">
        <LegacyPickerColumn
          align="center"
          fontSize={25}
          onValueChange={setHour}
          options={hours}
          padX={15}
          value={hour}
        />
      </div>
      <div className="relative z-[2] flex flex-[1] shrink-0 border-r border-[#000]/20 shadow-[1px_0_0_0_rgba(255,255,255,0.3)]">
        <LegacyPickerColumn
          align="center"
          fontSize={25}
          onValueChange={setMinute}
          options={minutes}
          padX={10}
          value={minute}
        />
      </div>
      <div className="relative z-[1] flex flex-[1.2] shrink-0">
        <LegacyPickerColumn
          align="center"
          fontSize={20}
          infinite={false}
          onValueChange={setAmpm}
          options={meridiem}
          padX={15}
          value={ampm}
        />
      </div>
    </LegacyPickerContainer>
  );
}`;

export const LEGACY_WHEEL_PICKER_FORM_SNIPPET = `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LegacyPickerColumn, LegacyPickerContainer } from "@/components/legacy-wheel-picker"

const formSchema = z.object({
  framework: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

const formOptions = [
  { label: "Vite", value: "vite" },
  { label: "Laravel", value: "laravel", disabled: true },
  { label: "Next.js", value: "nextjs" },
  { label: "Astro", value: "astro" },
]

export function LegacyHookFormDemo() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { framework: "nextjs" },
  })

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    toast("Settings Saved", {
      description: \`Framework set to \${formOptions.find((o) => o.value === values.framework)?.label}\`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-[320px] flex-col gap-6">
        <FormField
          control={form.control}
          name="framework"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-center">
              <FormLabel className="sr-only">Framework</FormLabel>
              <FormControl>
                <LegacyPickerContainer className="w-full">
                  <LegacyPickerColumn
                    align="center"
                    fontSize={22}
                    onValueChange={field.onChange}
                    options={formOptions}
                    value={field.value}
                  />
                </LegacyPickerContainer>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full rounded-full">Submit</Button>
      </form>
    </Form>
  )
}`;

export const LEGACY_WHEEL_PICKER_SECTION_IDS = [
	{ id: "install", label: "Install" },
	{ id: "usage", label: "Usage" },
	{ id: "registry", label: "Registry details" },
	{ id: "notes", label: "Notes" },
] as const;

export const LEGACY_WHEEL_PICKER_DOCS_COPY = {
	title: "Legacy Wheel Picker",
	summary:
		"Time pickers, counters, and finite option selectors with legacy chrome.",
	kicker: "Registry block",
	dependencyBadge: "Built on @ncdai/react-wheel-picker",
	installDescription:
		"Use the direct item URL if you want the shortest path, or add the Sabraman registry alias to your components config so future installs look like first-party shadcn commands.",
	usageDescription:
		"The registry block exports only the shell container and the column primitive. That keeps it flexible for time pickers, counters, unit selectors, or any legacy slot-machine UI built on the same wheel foundation.",
	registryDescription:
		"These are the URLs your team or your users will actually hit when they install or inspect the block.",
	notesDescription:
		"The block is deliberately opinionated about the shell, but the wheel columns stay composable. That makes it easy to keep the exact legacy look while swapping the options and width ratios.",
	manualTitle:
		"Then copy the component source from the registry item into components/legacy-wheel-picker.tsx",
	manualDescription:
		"If you already use shadcn registries, the direct URL or alias install is cleaner. Manual setup is here for teams that want full control over the file location.",
	hubNote:
		"Every version shares the same install commands, usage snippet, registry links, and component behavior. Only the visual wrapper changes.",
} as const;

export const LEGACY_WHEEL_PICKER_ASIDE_CARDS = [
	{
		kind: "output",
		title: "Output",
		segments: [
			{ type: "text", value: "Installs to " },
			{ type: "code", value: "components/legacy-wheel-picker.tsx" },
			{ type: "text", value: " so the final import stays " },
			{ type: "code", value: "@/components/legacy-wheel-picker" },
			{ type: "text", value: "." },
		],
	},
	{
		kind: "dependency",
		title: "Dependency",
		segments: [
			{ type: "text", value: "Built on top of " },
			{ type: "code", value: "@ncdai/react-wheel-picker" },
			{
				type: "text",
				value:
					" while keeping the shell and wheel geometry under your control.",
			},
		],
	},
] as const;

export const LEGACY_WHEEL_PICKER_NOTES = [
	{
		title: "Alignment",
		body: "The component compensates for the wheel primitive's taller internal cylinder so the selected row stays locked to the glossy band.",
	},
	{
		title: "Figma match",
		body: "The shell keeps the 176px content width, 44px row height, and intended 2 / 1 / 2 visible framing from the source file.",
	},
	{
		title: "Composition",
		body: "Change the column widths, text alignment, and finite or infinite lists to build counters, date pickers, and other legacy controls on the same shell.",
	},
] as const;

export const LEGACY_WHEEL_PICKER_REGISTRY_CARDS = [
	{
		title: "Item JSON",
		url: LEGACY_WHEEL_PICKER_URLS.direct,
		action: "Open item",
	},
	{
		title: "Registry index",
		url: LEGACY_WHEEL_PICKER_URLS.registry,
		action: "Open registry",
	},
	{
		title: "Docs URL",
		url: LEGACY_WHEEL_PICKER_URLS.docs,
		action: "Open docs hub",
	},
] as const;
