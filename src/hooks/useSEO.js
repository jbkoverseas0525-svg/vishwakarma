import { useEffect } from 'react'

function setMeta(name, value, isProperty = false) {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    if (isProperty) el.setAttribute('property', name)
    else el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

export default function useSEO({ title, description, path }) {
  useEffect(() => {
    if (title) document.title = title
    if (description) {
      setMeta('description', description)
      setMeta('og:description', description, true)
      setMeta('twitter:description', description)
    }
    if (title) {
      setMeta('og:title', title, true)
      setMeta('twitter:title', title)
    }
    if (path) {
      const url = `https://vishwakarmatechnoenergy.com${path}`
      setCanonical(url)
      setMeta('og:url', url, true)
    }
  }, [title, description, path])
}
