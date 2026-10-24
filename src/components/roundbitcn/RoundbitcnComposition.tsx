import {
	ROUNDBITCN_COMPONENT_DOCS,
	type RoundbitcnComponentSlug,
} from "~/components/roundbitcn-content";

const compositionParts: Partial<Record<RoundbitcnComponentSlug, string[]>> = {
	accordion: [
		"Accordion",
		"  AccordionItem",
		"    AccordionTrigger",
		"    AccordionContent",
	],
	"alert-dialog": [
		"AlertDialog",
		"  AlertDialogTrigger",
		"  AlertDialogContent",
		"    AlertDialogHeader",
		"      AlertDialogTitle",
		"      AlertDialogDescription",
		"    AlertDialogFooter",
		"      AlertDialogCancel",
		"      AlertDialogAction",
	],
	breadcrumb: [
		"Breadcrumb",
		"  BreadcrumbList",
		"    BreadcrumbItem",
		"      BreadcrumbLink",
		"      BreadcrumbPage",
		"    BreadcrumbSeparator",
		"    BreadcrumbEllipsis",
	],
	"button-group": ["ButtonGroup", "  Button"],
	card: [
		"Card",
		"  CardHeader",
		"    CardTitle",
		"    CardDescription",
		"    CardAction",
		"  CardContent",
		"  CardFooter",
	],
	command: [
		"Command",
		"  CommandInput",
		"  CommandList",
		"    CommandEmpty",
		"    CommandGroup",
		"      CommandItem",
		"      CommandSeparator",
	],
	dialog: [
		"Dialog",
		"  DialogTrigger",
		"  DialogContent",
		"    DialogHeader",
		"      DialogTitle",
		"      DialogDescription",
		"    DialogFooter",
	],
	drawer: [
		"Drawer",
		"  DrawerTrigger",
		"  DrawerContent",
		"    DrawerHeader",
		"      DrawerTitle",
		"      DrawerDescription",
		"    DrawerFooter",
	],
	"dropdown-menu": [
		"DropdownMenu",
		"  DropdownMenuTrigger",
		"  DropdownMenuContent",
		"    DropdownMenuItem",
		"    DropdownMenuSeparator",
		"    DropdownMenuSub",
	],
	field: [
		"Field",
		"  FieldLabel",
		"  FieldDescription",
		"  FieldContent",
		"  FieldError",
	],
	form: [
		"Form",
		"  FormField",
		"    FormItem",
		"      FormLabel",
		"      FormControl",
		"      FormDescription",
		"      FormMessage",
	],
	"input-group": [
		"InputGroup",
		"  InputGroupAddon",
		"  InputGroupInput",
		"  InputGroupButton",
		"  InputGroupText",
	],
	menubar: [
		"Menubar",
		"  MenubarMenu",
		"    MenubarTrigger",
		"    MenubarContent",
		"      MenubarItem",
		"      MenubarSeparator",
	],
	"navigation-menu": [
		"NavigationMenu",
		"  NavigationMenuList",
		"    NavigationMenuItem",
		"      NavigationMenuTrigger",
		"      NavigationMenuContent",
		"      NavigationMenuLink",
	],
	pagination: [
		"Pagination",
		"  PaginationContent",
		"    PaginationItem",
		"      PaginationLink",
		"      PaginationPrevious",
		"      PaginationNext",
		"      PaginationEllipsis",
	],
	"radio-group": ["RadioGroup", "  RadioGroupItem"],
	resizable: ["ResizablePanelGroup", "  ResizablePanel", "  ResizableHandle"],
	select: [
		"Select",
		"  SelectTrigger",
		"    SelectValue",
		"  SelectContent",
		"    SelectGroup",
		"      SelectLabel",
		"      SelectItem",
	],
	sheet: [
		"Sheet",
		"  SheetTrigger",
		"  SheetContent",
		"    SheetHeader",
		"      SheetTitle",
		"      SheetDescription",
		"    SheetFooter",
	],
	table: [
		"Table",
		"  TableHeader",
		"    TableRow",
		"      TableHead",
		"  TableBody",
		"    TableRow",
		"      TableCell",
		"  TableFooter",
	],
	tabs: ["Tabs", "  TabsList", "    TabsTrigger", "  TabsContent"],
	"toggle-group": ["ToggleGroup", "  ToggleGroupItem"],
};

export function RoundbitcnComposition({
	component,
}: {
	component: RoundbitcnComponentSlug;
}) {
	const meta = ROUNDBITCN_COMPONENT_DOCS.find(
		(item) => item.slug === component,
	);
	const title = meta?.title ?? component;
	const lines = compositionParts[component] ?? [title];

	return (
		<div className="not-prose mt-4 grid w-full gap-4">
			<p className="text-muted-foreground">
				Use the following composition to build a{" "}
				<code className="roundbit-sm roundbit-step bg-muted px-1.5 py-0.5 font-mono text-sm">
					{title}
				</code>
				:
			</p>
			<pre className="roundbit-frame roundbit-lg roundbit-step roundbit-border roundbit-border-solid roundbit-border-border w-full overflow-x-auto bg-muted/35 p-6 font-mono text-sm leading-7">
				<code>{lines.join("\n")}</code>
			</pre>
		</div>
	);
}
