import type { AudienceId } from '../content/types';

const KEY = 'sb-audience';
export const AUDIENCE_IDS: AudienceId[] = ['owners', 'real-estate', 'families', 'family-offices'];
const isAudience = (v: unknown): v is AudienceId => AUDIENCE_IDS.includes(v as AudienceId);

export function getAudience(): AudienceId | null {
  try {
    const v = sessionStorage.getItem(KEY);
    return isAudience(v) ? v : null;
  } catch {
    return null;
  }
}

/** Saves (or clears) the visitor's choice for this visit and tells the page. */
export function setAudience(id: AudienceId | null) {
  try {
    if (id) sessionStorage.setItem(KEY, id);
    else sessionStorage.removeItem(KEY);
  } catch { /* storage blocked: the choice still applies to this page */ }
  applyAudience(id);
  window.dispatchEvent(new CustomEvent('sb:audience', { detail: id }));
}

/** Marks every element tagged with data-audiences as relevant or not. */
export function applyAudience(id: AudienceId | null) {
  document.querySelectorAll<HTMLElement>('[data-audiences]').forEach((el) => {
    const match = !!id && el.dataset.audiences!.split(' ').includes(id);
    el.toggleAttribute('data-highlight', match);
    el.toggleAttribute('data-dim', !!id && !match);
  });
}
