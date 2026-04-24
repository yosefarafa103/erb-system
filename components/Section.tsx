import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { HTMLAttributes, ReactNode } from "react";

const Section = ({ children, className }: SectionChildrenProps) => {
    return (
        <section className={className} >
            {children}
        </section >
    )
}

export default Section
interface SectionTitleProps {
    title: string;
    icon?: IconSvgElement
}

Section.Title = ({ icon, title }: SectionTitleProps) => (
    <h1 className="md:text-2xl text-lg font-bold text-foreground flex gap-2">
        {icon ?
            <HugeiconsIcon icon={icon} />
            : null}
        {title}
    </h1>
)

interface SectionChildrenProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
}

Section.Children = ({ children }: SectionChildrenProps) => (
    <section className="mt-4">
        {children}
    </section>
)

