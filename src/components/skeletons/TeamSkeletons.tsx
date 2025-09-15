import { Skeleton, SkeletonCard } from "./SkeletonBase"

// Skeleton for team card
export function TeamCardSkeleton() {
  return (
    <SkeletonCard className="overflow-hidden">
      {/* Image skeleton - matches aspect-video container */}
      <div className="aspect-video w-full bg-muted/40 p-6 flex items-center justify-center">
        <Skeleton className="h-40 w-40 rounded-md" />
      </div>
      
      {/* Header skeleton */}
      <div className="p-6 pb-2">
        <Skeleton className="h-6 w-32 mb-2" />
      </div>
      
      {/* Content skeleton */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <Skeleton className="h-4 w-12 mb-1" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div>
            <Skeleton className="h-4 w-12 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        
        {/* Trophy section skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </SkeletonCard>
  )
}

// Skeleton for team grid
export function TeamGridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: cards }).map((_, i) => (
        <TeamCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Skeleton for team table row
// export function TeamTableRowSkeleton() {
//   return (
//     <tr className="border-b">
//       <td className="px-6 py-4">
//         <div className="flex items-center space-x-3">
//           <SkeletonAvatar size="md" />
//           <Skeleton className="h-4 w-32" />
//         </div>
//       </td>
//       <td className="px-6 py-4">
//         <Skeleton className="h-4 w-24" />
//       </td>
//       <td className="px-6 py-4">
//         <Skeleton className="h-4 w-16" />
//       </td>
//       <td className="px-6 py-4">
//         <Skeleton className="h-4 w-20" />
//       </td>
//       <td className="px-6 py-4">
//         <Skeleton className="h-4 w-12" />
//       </td>
//       <td className="px-6 py-4">
//         <SkeletonButton size="sm" className="w-20" />
//       </td>
//     </tr>
//   )
// }

// Skeleton for team table
// export function TeamTableSkeleton({ rows = 5 }: { rows?: number }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead>
//           <tr className="border-b">
//             <th className="px-6 py-3 text-left">
//               <Skeleton className="h-4 w-20" />
//             </th>
//             <th className="px-6 py-3 text-left">
//               <Skeleton className="h-4 w-16" />
//             </th>
//             <th className="px-6 py-3 text-left">
//               <Skeleton className="h-4 w-20" />
//             </th>
//             <th className="px-6 py-3 text-left">
//               <Skeleton className="h-4 w-16" />
//             </th>
//             <th className="px-6 py-3 text-left">
//               <Skeleton className="h-4 w-12" />
//             </th>
//             <th className="px-6 py-3 text-left">
//               <Skeleton className="h-4 w-20" />
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.from({ length: rows }).map((_, i) => (
//             <TeamTableRowSkeleton key={i} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// Complete teams page skeleton

export function TeamsPageSkeleton() {
  return (
    <div className="container py-8 mx-auto">
      <SkeletonCard>
        <div className="p-6">
          <div className="space-y-2 mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          
          <div className="mb-6">
            <TeamGridSkeleton cards={6} />
          </div>
        </div>
      </SkeletonCard>
    </div>
  )
}
