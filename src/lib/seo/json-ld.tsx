type JsonLdObject = Record<string, unknown>;

function serializeJsonLd(data: JsonLdObject | JsonLdObject[]) {
	return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({
	data,
	id,
}: {
	data: JsonLdObject | JsonLdObject[];
	id?: string;
}) {
	return (
		<script
			id={id}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
		/>
	);
}
