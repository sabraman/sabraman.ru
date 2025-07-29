import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

interface WorkExperienceProps {
	title: string;
	company: string;
	period: string;
	location: string;
	achievements: string[];
}

const WorkExperience = ({
	title,
	company,
	period,
	location,
	achievements,
}: WorkExperienceProps) => {
	return (
		<Card className="mb-8 border-none bg-[#f6f6f6] shadow-none">
			<CardHeader className="pb-2">
				<div className="flex flex-col space-y-1">
					<div className="flex items-center justify-between">
						<h3 className="font-medium text-[#1a1a1a] text-xl">{company}</h3>
						<Badge variant="outline" className="font-mono text-xs">
							{period}
						</Badge>
					</div>
					<div className="flex items-center justify-between">
						<p className="font-mono text-[#888888] text-sm">{title}</p>
						<span className="text-[#888888] text-xs">{location}</span>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<ul className="list-inside space-y-2">
					{achievements.map((achievement, index) => (
						<li
							key={`achievement-${index}-${achievement.slice(0, 10).replace(/\s+/g, "-")}`}
							className="text-[#333333] text-sm leading-relaxed"
						>
							{achievement}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};

export default WorkExperience;
