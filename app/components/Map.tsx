'use client'

import { useEffect, useRef } from 'react'
import type { Listing } from '@/lib/listings'

interface MapProps {
  listings: Listing[]
  activeListing: Listing | null
  onSelect: (listing: Listing) => void
}

export default function Map({ listings, activeListing, onSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<{ [key: string]: any }>({})

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    import('leaflet').then((L) => {
      const map = L.map(mapRef.current!, {
        center: [52.5, -1.5],
        zoom: 6,
        zoomControl: false,
        attributionControl: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map)

      L.control.zoom({ position: 'topright' }).addTo(map)

      listings.forEach((listing) => {
        const div = document.createElement('div')
        div.className = `price-pin${listing.featured ? ' active' : ''}`
        div.innerText = listing.priceLabel

        const icon = L.divIcon({
          html: div,
          className: '',
          iconAnchor: [div.offsetWidth / 2, 0],
        })

        const marker = L.marker([listing.lat, listing.lng], { icon })
          .addTo(map)
          .on('click', () => onSelect(listing))

        markersRef.current[listing.id] = { marker, div }
      })

      mapInstanceRef.current = map
    })

    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Update active state on markers
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, { div }]) => {
      if (activeListing?.id === id) {
        div.className = 'price-pin active'
      } else {
        div.className = 'price-pin'
      }
    })

    if (activeListing && mapInstanceRef.current) {
      mapInstanceRef.current.panTo([activeListing.lat, activeListing.lng], {
        animate: true,
        duration: 0.4,
      })
    }
  }, [activeListing])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
