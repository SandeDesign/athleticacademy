import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit3, Save, X, Plus, Trash2, GripVertical } from 'lucide-react'
import toast from 'react-hot-toast'
import { useTenantConfig } from '../../hooks/useTenantConfig'
import { getDocument, setDocument } from '../../lib/firestore'
import RichTextEditor from '../../components/ui/RichTextEditor'
import ImageUpload from '../../components/ui/ImageUpload'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'

// ============================================================
// Types
// ============================================================

interface HeroData {
  titel?: string
  subtitel?: string
  ctaTekst?: string
  ctaLink?: string
  achtergrondUrl?: string
}

interface AboutData {
  titel?: string
  tekst?: string
  afbeeldingUrl?: string
  kenmerken?: string[]
}

interface ServiceItem {
  titel: string
  beschrijving: string
  prijs?: string
}

interface ServicesData {
  titel?: string
  items?: ServiceItem[]
}

// ============================================================
// Secties configuratie
// ============================================================

const paginaConfig = [
  {
    key: 'hero',
    label: 'Homepage — Hero',
    beschrijving: 'De grote banner bovenaan de homepage',
    websiteKey: 'hero' as const,
  },
  {
    key: 'about',
    label: 'Over ons',
    beschrijving: 'Tekst, kenmerken en afbeelding op de over-ons pagina',
    websiteKey: 'about' as const,
  },
  {
    key: 'services',
    label: 'Diensten',
    beschrijving: 'De lijst met diensten en prijzen',
    websiteKey: 'services' as const,
  },
]

// ============================================================
// Component
// ============================================================

const CmsPaginas = () => {
  const { config } = useTenantConfig()
  const [editing, setEditing] = useState<string | null>(null)
  const [data, setData] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)

  const activePaginas = paginaConfig.filter(
    (p) => config.website[p.websiteKey],
  )

  const loadSection = async (key: string) => {
    const doc = await getDocument<Record<string, unknown>>(`content/${key}`)
    setData(doc || {})
    setEditing(key)
  }

  const saveSection = async () => {
    if (!editing) return
    setSaving(true)
    try {
      const { id, ...saveData } = data
      await setDocument(`content/${editing}`, saveData)
      toast.success('Opgeslagen!')
      setEditing(null)
    } catch {
      toast.error('Opslaan mislukt')
    } finally {
      setSaving(false)
    }
  }

  const update = (field: string, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pagina&#39;s bewerken</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Bewerk de inhoud van de publieke website pagina&#39;s.
        </p>
      </div>

      {!editing ? (
        /* ====== Overzicht ====== */
        <div className="space-y-4">
          {activePaginas.map((pagina) => (
            <motion.div
              key={pagina.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="py-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {pagina.label}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {pagina.beschrijving}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Edit3 size={14} />}
                    onClick={() => loadSection(pagina.key)}
                  >
                    Bewerken
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* ====== Editor ====== */
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {activePaginas.find((p) => p.key === editing)?.label} bewerken
            </CardTitle>
            <button
              onClick={() => setEditing(null)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </CardHeader>
          <CardContent className="space-y-6">
            {editing === 'hero' && (
              <HeroEditor data={data as HeroData} onChange={update} />
            )}
            {editing === 'about' && (
              <AboutEditor data={data as AboutData} onChange={update} />
            )}
            {editing === 'services' && (
              <ServicesEditor data={data as ServicesData} onChange={update} />
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button onClick={saveSection} isLoading={saving} icon={<Save size={16} />}>
                Opslaan
              </Button>
              <Button variant="outline" onClick={() => setEditing(null)}>
                Annuleren
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ============================================================
// Hero Editor
// ============================================================

const HeroEditor = ({
  data,
  onChange,
}: {
  data: HeroData
  onChange: (field: string, value: unknown) => void
}) => (
  <div className="space-y-4">
    <Input
      label="Titel"
      value={data.titel || ''}
      onChange={(e) => onChange('titel', e.target.value)}
      placeholder="Welkom bij ons bedrijf"
    />
    <Input
      label="Subtitel"
      value={data.subtitel || ''}
      onChange={(e) => onChange('subtitel', e.target.value)}
      placeholder="Korte beschrijving van wat u doet"
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Input
        label="CTA knop tekst"
        value={data.ctaTekst || ''}
        onChange={(e) => onChange('ctaTekst', e.target.value)}
        placeholder="Neem contact op"
      />
      <Input
        label="CTA knop link"
        value={data.ctaLink || ''}
        onChange={(e) => onChange('ctaLink', e.target.value)}
        placeholder="/contact"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Achtergrondafbeelding
      </label>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        Zonder afbeelding wordt een kleurverloop gebruikt.
      </p>
      <ImageUpload
        value={data.achtergrondUrl || ''}
        onChange={(url) => onChange('achtergrondUrl', url)}
      />
    </div>
  </div>
)

// ============================================================
// About Editor
// ============================================================

const AboutEditor = ({
  data,
  onChange,
}: {
  data: AboutData
  onChange: (field: string, value: unknown) => void
}) => {
  const kenmerken = data.kenmerken || []

  const addKenmerk = () => {
    onChange('kenmerken', [...kenmerken, ''])
  }

  const updateKenmerk = (index: number, value: string) => {
    const updated = [...kenmerken]
    updated[index] = value
    onChange('kenmerken', updated)
  }

  const removeKenmerk = (index: number) => {
    onChange('kenmerken', kenmerken.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <Input
        label="Titel"
        value={data.titel || ''}
        onChange={(e) => onChange('titel', e.target.value)}
        placeholder="Over ons"
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tekst
        </label>
        <RichTextEditor
          value={data.tekst || ''}
          onChange={(val) => onChange('tekst', val)}
          placeholder="Vertel over uw bedrijf..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Afbeelding
        </label>
        <ImageUpload
          value={data.afbeeldingUrl || ''}
          onChange={(url) => onChange('afbeeldingUrl', url)}
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Kenmerken / USP&#39;s
          </label>
          <Button variant="outline" size="sm" icon={<Plus size={14} />} onClick={addKenmerk}>
            Toevoegen
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Korte bulletpoints die naast de tekst worden getoond met een vinkje.
        </p>
        {kenmerken.length > 0 ? (
          <div className="space-y-2">
            {kenmerken.map((kenmerk, i) => (
              <div key={i} className="flex items-center gap-2">
                <GripVertical size={14} className="text-gray-300 flex-shrink-0" />
                <input
                  type="text"
                  value={kenmerk}
                  onChange={(e) => updateKenmerk(i, e.target.value)}
                  placeholder="Bijv. 10 jaar ervaring"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => removeKenmerk(i)}
                  className="p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">Nog geen kenmerken toegevoegd.</p>
        )}
      </div>
    </div>
  )
}

// ============================================================
// Services Editor
// ============================================================

const ServicesEditor = ({
  data,
  onChange,
}: {
  data: ServicesData
  onChange: (field: string, value: unknown) => void
}) => {
  const items = data.items || []

  const addItem = () => {
    onChange('items', [...items, { titel: '', beschrijving: '', prijs: '' }])
  }

  const updateItem = (index: number, field: keyof ServiceItem, value: string) => {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    onChange('items', updated)
  }

  const removeItem = (index: number) => {
    onChange('items', items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <Input
        label="Paginatitel"
        value={data.titel || ''}
        onChange={(e) => onChange('titel', e.target.value)}
        placeholder="Onze diensten"
      />

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Diensten
          </label>
          <Button variant="outline" size="sm" icon={<Plus size={14} />} onClick={addItem}>
            Dienst toevoegen
          </Button>
        </div>

        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item, i) => (
              <Card key={i} className="bg-gray-50 dark:bg-gray-800/50">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-medium text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                      Dienst {i + 1}
                    </span>
                    <button
                      onClick={() => removeItem(i)}
                      className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <Input
                    label="Titel"
                    value={item.titel}
                    onChange={(e) => updateItem(i, 'titel', e.target.value)}
                    placeholder="Naam van de dienst"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Beschrijving
                    </label>
                    <textarea
                      rows={2}
                      value={item.beschrijving}
                      onChange={(e) => updateItem(i, 'beschrijving', e.target.value)}
                      placeholder="Korte beschrijving van de dienst"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-none"
                    />
                  </div>
                  <Input
                    label="Prijs (optioneel)"
                    value={item.prijs || ''}
                    onChange={(e) => updateItem(i, 'prijs', e.target.value)}
                    placeholder="Bijv. Vanaf €99"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <p className="text-sm text-gray-400 mb-3">Nog geen diensten toegevoegd.</p>
            <Button variant="outline" size="sm" icon={<Plus size={14} />} onClick={addItem}>
              Eerste dienst toevoegen
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CmsPaginas
