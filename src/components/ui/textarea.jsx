import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
  "border-input placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-primary aria-invalid:ring-destructive/30 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-background/40 backdrop-blur px-3 py-2 text-base shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props} />
  );
}

export { Textarea }
