"use client"

import { useState } from 'react'
import { X, Save, ChevronDown } from 'lucide-react'
import { GalleryPhoto } from '@/types'
import Image from 'next/image'

interface GalleryPhotoFormProps {
  photo: GalleryPhoto
  onSave: (id: string, data: { title: string; category: string }) => Promise<void>
  onCancel: () => void
}

export function GalleryPhotoForm({ photo, onSave, onCancel }: GalleryPhotoFormProps) {
  const [title, setTitle] = useState(photo.title)
  const [category, setCategory] = useState(photo.category)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !category.trim()) {
      return
    }

    setSaving(true)
    try {
      await onSave(photo.id, { title: title.trim(), category: category.trim() })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-60 p-4">
      <div className="bg-luxury-light rounded-xl w-full max-w-2xl shadow-2xl border border-luxury-accent/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-luxury-accent/20">
          <h2 className="text-xl font-semibold text-luxury-text">Edit Photo</h2>
          <button
            onClick={onCancel}
            className="text-luxury-text-muted hover:text-luxury-text transition-colors p-2 hover:bg-luxury-dark/50 rounded-lg"
            disabled={saving}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex gap-6">
            {/* Preview */}
            <div className="shrink-0">
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-luxury-accent/20">
                <Image
                  src={photo.image_url}
                  alt={photo.title}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-luxury-text mb-2">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-luxury-dark border border-luxury-accent/30 rounded-lg text-luxury-text placeholder-luxury-text-muted focus:outline-none focus:ring-2 focus:ring-luxury-accent transition-all"
                  placeholder="Enter photo title"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-luxury-text mb-2">
                  Category *
                </label>
                <div className="relative">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 pr-10 bg-luxury-dark border border-luxury-accent/30 rounded-lg text-luxury-text focus:outline-none focus:ring-2 focus:ring-luxury-accent transition-all appearance-none"
                    required
                    disabled={saving}
                  >
                    <option value="">Select a category</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="bridal">Bridal</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="alterations">Alterations</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-luxury-accent/20">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-luxury-text-muted hover:text-luxury-text hover:bg-luxury-dark/50 rounded-lg transition-all font-medium"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !title.trim() || !category.trim()}
              className="flex items-center gap-2 bg-luxury-accent text-luxury-dark px-6 py-2 rounded-lg hover:bg-luxury-accent-light transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save Changes'}</span>
              <span className="sm:hidden">{saving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}