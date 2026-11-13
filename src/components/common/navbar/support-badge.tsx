import { Headset } from "lucide-react"
import { contactInfo } from "./nav-data"

export default function SupportBadge() {
  return (
    <a href={`tel:${contactInfo.phone}`} className="hidden shrink-0 items-center gap-2 lg:flex">
      <span className="flex size-10 items-center justify-center rounded-full bg-green-50 text-green-600">
        <Headset className="size-5" />
      </span>
      <span className="hidden flex-col leading-tight xl:flex">
        <span className="text-xs text-muted-foreground">Support</span>
        <span className="text-sm font-semibold">24/7 Help</span>
      </span>
    </a>
  )
}
