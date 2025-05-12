// This component will be replaced with a static address display
export function GoogleMap({ address, className = "" }: { address: string; className?: string }) {
    return (
      <div className={`rounded-lg bg-muted p-4 ${className}`}>
        <p className="text-center text-muted-foreground">{address}</p>
      </div>
    )
  }
  