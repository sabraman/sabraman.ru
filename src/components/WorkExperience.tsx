import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"

interface WorkExperienceProps {
    title: string
    company: string
    period: string
    location: string
    achievements: string[]
}

const WorkExperience = ({ title, company, period, location, achievements }: WorkExperienceProps) => {
    return (
        <Card className="mb-8 border-none bg-[#f6f6f6] shadow-none">
            <CardHeader className="pb-2">
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-medium text-[#1a1a1a]">{company}</h3>
                        <Badge variant="outline" className="font-mono text-xs">
                            {period}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-mono text-sm text-[#888888]">{title}</p>
                        <span className="text-xs text-[#888888]">{location}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="list-inside space-y-2">
                    {achievements.map((achievement, index) => (
                        <li key={index} className="text-sm leading-relaxed text-[#333333]">
                            {achievement}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export default WorkExperience 