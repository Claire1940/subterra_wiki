import { Bookmark } from 'lucide-react'

/**
 * 提示用户收藏本页 / 关注官方渠道更新的视觉提示块。
 * 无 children，作为段落分隔的提示性 callout 使用。
 */
export function BookmarkNote() {
  return (
    <div className="flex items-center gap-2 my-4 px-4 py-2 rounded-lg border border-blue-500/30 bg-blue-900/20 text-blue-300 text-sm">
      <Bookmark className="w-4 h-4 flex-shrink-0" />
      <span>Bookmark this page for the latest updates.</span>
    </div>
  )
}
