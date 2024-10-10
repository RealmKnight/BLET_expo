import { supabase } from '~/utils/supabase';

export function combineWCArrays(
  wcmembers: any[],
  dmirmembers: any[],
  dwpmembers: any[],
  sys1members: any[],
  ejemembers: any[],
  sys2members: any[]
) {
  const combinedArray = [];

  // Add all wcmembers
  combinedArray.push(...wcmembers);

  // Add dmirmembers and dwpmembers in the specified pattern
  while (dmirmembers.length > 0 || dwpmembers.length > 0) {
    if (dmirmembers.length >= 2) {
      combinedArray.push(dmirmembers.shift());
      combinedArray.push(dmirmembers.shift());
    } else if (dmirmembers.length === 1) {
      combinedArray.push(dmirmembers.shift());
    }

    if (dwpmembers.length > 0) {
      combinedArray.push(dwpmembers.shift());
    }
  }

  // Add remaining arrays
  combinedArray.push(...sys1members);
  combinedArray.push(...ejemembers);
  combinedArray.push(...sys2members);

  return combinedArray;
}

export function combineDWPArrays(
  wcmembers: any[],
  dmirmembers: any[],
  dwpmembers: any[],
  sys1members: any[],
  ejemembers: any[],
  sys2members: any[]
) {
  const combinedArray = [];

  // Add all dwpmembers
  combinedArray.push(...dwpmembers);

  // Add wcmembers and dmirmembers in the specified pattern 4 WC and 1 DMIR eng
  while (wcmembers.length > 0 || dmirmembers.length > 0) {
    if (wcmembers.length >= 4) {
      combinedArray.push(wcmembers.shift());
      combinedArray.push(wcmembers.shift());
      combinedArray.push(wcmembers.shift());
      combinedArray.push(wcmembers.shift());
    } else {
      // Add remaining wcmembers
      while (wcmembers.length > 0) {
        combinedArray.push(wcmembers.shift());
      }
    }

    if (dmirmembers.length > 0) {
      combinedArray.push(dmirmembers.shift());
    }
  }

  // Add remaining arrays
  combinedArray.push(...sys1members);
  combinedArray.push(...ejemembers);
  combinedArray.push(...sys2members);

  return combinedArray;
}

export function combineDMIRArrays(
  wcmembers: any[],
  dmirmembers: any[],
  dwpmembers: any[],
  sys1members: any[],
  ejemembers: any[],
  sys2members: any[]
) {
  const combinedArray = [];

  // Add all dmirmembers
  combinedArray.push(...dmirmembers);

  // Add wcmembers and dwpmembers in the specified pattern 6 WC and 1 DWP eng
  while (wcmembers.length > 0 || dwpmembers.length > 0) {
    if (wcmembers.length >= 6) {
      combinedArray.push(wcmembers.shift());
      combinedArray.push(wcmembers.shift());
      combinedArray.push(wcmembers.shift());
      combinedArray.push(wcmembers.shift());
      combinedArray.push(wcmembers.shift());
      combinedArray.push(wcmembers.shift());
    } else {
      // Add remaining wcmembers
      while (wcmembers.length > 0) {
        combinedArray.push(wcmembers.shift());
      }
    }

    if (dwpmembers.length > 0) {
      combinedArray.push(dwpmembers.shift());
    }
  }

  // Add remaining arrays
  combinedArray.push(...sys1members);
  combinedArray.push(...ejemembers);
  combinedArray.push(...sys2members);

  return combinedArray;
}

export function combineEJEArrays(
  wcmembers: any[],
  dmirmembers: any[],
  dwpmembers: any[],
  sys1members: any[],
  ejemembers: any[],
  sys2members: any[]
) {
  const roster = [];

  // Add all ejemembers
  roster.push(...ejemembers);

  // Add wcmembers, dmirmembers, and dwpmembers in the specified pattern 7 WC, 2 DMIR, and 1 DWP eng
  while (wcmembers.length > 0 || dmirmembers.length > 0 || dwpmembers.length > 0) {
    if (wcmembers.length >= 7) {
      roster.push(wcmembers.shift());
      roster.push(wcmembers.shift());
      roster.push(wcmembers.shift());
      roster.push(wcmembers.shift());
      roster.push(wcmembers.shift());
      roster.push(wcmembers.shift());
      roster.push(wcmembers.shift());
    } else {
      // Add remaining wcmembers
      while (wcmembers.length > 0) {
        roster.push(wcmembers.shift());
      }
    }

    if (dmirmembers.length >= 2) {
      roster.push(dmirmembers.shift());
      roster.push(dmirmembers.shift());
    } else {
      // Add remaining dmirmembers
      while (dmirmembers.length > 0) {
        roster.push(dmirmembers.shift());
      }
    }

    if (dwpmembers.length > 0) {
      roster.push(dwpmembers.shift());
    }
  }

  // Add remaining arrays
  roster.push(...sys1members);
  roster.push(...sys2members);

  return roster;
}
