import type {
  Case,
  CPU,
  Memory,
  Motherboard,
  PowerSupply,
  VideoCard,
} from '@/src/lib/graphql/types';

export interface CompatibilityIssue {
  type: 'error' | 'warning';
  component: string;
  message: string;
}

export function checkCompatibility(
  cpu: CPU | null,
  motherboard: Motherboard | null,
  memory: Memory[],
  videoCard: VideoCard | null,
  pcCase: Case | null,
  powerSupply: PowerSupply | null,
): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];

  // Check CPU and Motherboard socket compatibility
  if (cpu && motherboard && cpu.socket !== motherboard.socket) {
    issues.push({
      type: 'error',
      component: 'CPU/Motherboard',
      message: `CPU socket (${cpu.socket}) does not match motherboard socket (${motherboard.socket})`,
    });
  }

  // Check Memory type compatibility
  if (motherboard && memory.length > 0) {
    const incompatibleMemory = memory.filter(
      (m) => m.type !== motherboard.memoryType,
    );
    if (incompatibleMemory.length > 0) {
      issues.push({
        type: 'error',
        component: 'Memory',
        message: `Memory type must be ${motherboard.memoryType}. Found incompatible: ${incompatibleMemory.map((m) => m.type).join(', ')}`,
      });
    }

    // Check memory slot count
    if (memory.length > motherboard.memorySlots) {
      issues.push({
        type: 'error',
        component: 'Memory',
        message: `Too many memory modules (${memory.length}). Motherboard only has ${motherboard.memorySlots} slots`,
      });
    }

    // Check total memory capacity
    const totalMemory = memory.reduce((sum, m) => sum + m.capacity, 0);
    if (totalMemory > motherboard.maxMemory) {
      issues.push({
        type: 'warning',
        component: 'Memory',
        message: `Total memory (${totalMemory}GB) exceeds motherboard maximum (${motherboard.maxMemory}GB)`,
      });
    }
  }

  // Check GPU length vs Case clearance
  if (videoCard && pcCase && videoCard.length > pcCase.maxGpuLength) {
    issues.push({
      type: 'error',
      component: 'Video Card/Case',
      message: `GPU length (${videoCard.length}mm) exceeds case clearance (${pcCase.maxGpuLength}mm)`,
    });
  }

  // Check Case form factor compatibility
  if (motherboard && pcCase) {
    const isCompatible = pcCase.formFactor.includes(motherboard.formFactor);
    if (!isCompatible) {
      issues.push({
        type: 'error',
        component: 'Motherboard/Case',
        message: `Motherboard form factor (${motherboard.formFactor}) not supported by case (${pcCase.formFactor.join(', ')})`,
      });
    }
  }

  // Check Power Supply wattage
  if (powerSupply && (cpu || videoCard)) {
    let estimatedWattage = 50; // Base for motherboard and other components
    if (cpu) estimatedWattage += cpu.tdp;
    if (videoCard) estimatedWattage += videoCard.tdp;
    estimatedWattage += memory.length * 5;

    const recommendedWattage = Math.ceil(estimatedWattage * 1.2); // 20% headroom

    if (powerSupply.wattage < estimatedWattage) {
      issues.push({
        type: 'error',
        component: 'Power Supply',
        message: `PSU wattage (${powerSupply.wattage}W) is insufficient. Estimated requirement: ${estimatedWattage}W`,
      });
    } else if (powerSupply.wattage < recommendedWattage) {
      issues.push({
        type: 'warning',
        component: 'Power Supply',
        message: `PSU wattage (${powerSupply.wattage}W) is below recommended (${recommendedWattage}W with 20% headroom)`,
      });
    }
  }

  return issues;
}
