// src/components/ui/skeleton.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "bg-muted animate-pulse",
  {
    variants: {
      size: {
        default: "h-4",
        sm: "h-3",
        lg: "h-6",
      },
      width: {
        default: "w-full",
        "2xl": "w-2/3",
        xl: "w-5/6",
      },
      radius: {
        default: "rounded",
        sm: "rounded-sm",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "default",
      width: "default",
      radius: "default",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, size, width, radius, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ size, width, radius, className }))}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";
