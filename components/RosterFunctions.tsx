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

  // Create a new array for the pattern
  const patternArray = [];

  // Apply the new pattern
  while (dmirmembers.length > 0 || dwpmembers.length > 0) {
    // 2 DMIR and 1 DWP, repeated 6 times
    for (let i = 0; i < 6 && (dmirmembers.length > 0 || dwpmembers.length > 0); i++) {
      for (let j = 0; j < 2 && dmirmembers.length > 0; j++) {
        patternArray.push(dmirmembers.shift());
      }
      if (dwpmembers.length > 0) {
        patternArray.push(dwpmembers.shift());
      }
    }

    // 1 DMIR and 1 DWP, repeated 4 times
    for (let i = 0; i < 4 && (dmirmembers.length > 0 || dwpmembers.length > 0); i++) {
      if (dmirmembers.length > 0) {
        patternArray.push(dmirmembers.shift());
      }
      if (dwpmembers.length > 0) {
        patternArray.push(dwpmembers.shift());
      }
    }
  }

  // Add the pattern array to the combined array
  combinedArray.push(...patternArray);

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

  // Create a new array for the pattern
  const patternArray = [];

  // Apply the new pattern
  while (wcmembers.length > 0 || dmirmembers.length > 0) {
    // 4 WC and 1 DMIR, repeated 7 times
    for (let i = 0; i < 7 && (wcmembers.length > 0 || dmirmembers.length > 0); i++) {
      for (let j = 0; j < 4 && wcmembers.length > 0; j++) {
        patternArray.push(wcmembers.shift());
      }
      if (dmirmembers.length > 0) {
        patternArray.push(dmirmembers.shift());
      }
    }

    // 3 WC and 1 DMIR, repeated 3 times
    for (let i = 0; i < 3 && (wcmembers.length > 0 || dmirmembers.length > 0); i++) {
      for (let j = 0; j < 3 && wcmembers.length > 0; j++) {
        patternArray.push(wcmembers.shift());
      }
      if (dmirmembers.length > 0) {
        patternArray.push(dmirmembers.shift());
      }
    }
  }

  // Add the pattern array to the combined array
  combinedArray.push(...patternArray);

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

  // Create a new array for the pattern
  const patternArray = [];

  // Apply the new pattern
  while (wcmembers.length > 0 || dwpmembers.length > 0) {
    // 6 WC and 1 DWP, repeated 9 times
    for (let i = 0; i < 9 && (wcmembers.length > 0 || dwpmembers.length > 0); i++) {
      for (let j = 0; j < 6 && wcmembers.length > 0; j++) {
        patternArray.push(wcmembers.shift());
      }
      if (dwpmembers.length > 0) {
        patternArray.push(dwpmembers.shift());
      }
    }

    // 5 WC and 1 DWP, once
    if (wcmembers.length > 0 || dwpmembers.length > 0) {
      for (let j = 0; j < 5 && wcmembers.length > 0; j++) {
        patternArray.push(wcmembers.shift());
      }
      if (dwpmembers.length > 0) {
        patternArray.push(dwpmembers.shift());
      }
    }
  }

  // Add the pattern array to the combined array
  combinedArray.push(...patternArray);

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
