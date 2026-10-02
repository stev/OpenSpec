/**
 * Telemetry environment signals.
 *
 * `DO_NOT_TRACK` remains a fail-safe opt-out: any value other than an explicit
 * off-value blocks telemetry. `OPENSPEC_TELEMETRY` is an opt-in control: only
 * explicit on-values enable telemetry.
 *
 * `isTelemetryOptedOutByEnv` is retained for the version check, which shares
 * the legacy opt-out semantics independently of telemetry collection.
 */

const ON_VALUES = new Set(['1', 'true', 'yes', 'on']);
const OFF_VALUES = new Set(['', '0', 'false', 'no', 'off']);

/** True when `DO_NOT_TRACK` is set to anything but an explicit off-value. */
export function isDoNotTrackSet(env: NodeJS.ProcessEnv = process.env): boolean {
  const value = env.DO_NOT_TRACK;
  return value !== undefined && !OFF_VALUES.has(value.trim().toLowerCase());
}

/** True when `OPENSPEC_TELEMETRY` is set to anything but an explicit on-value. */
export function isTelemetryDisabledByEnv(env: NodeJS.ProcessEnv = process.env): boolean {
  const value = env.OPENSPEC_TELEMETRY;
  return value !== undefined && !ON_VALUES.has(value.trim().toLowerCase());
}

/** True when `OPENSPEC_TELEMETRY` explicitly opts into telemetry. */
export function isTelemetryOptedInByEnv(env: NodeJS.ProcessEnv = process.env): boolean {
  const value = env.OPENSPEC_TELEMETRY;
  return value !== undefined && ON_VALUES.has(value.trim().toLowerCase());
}

/**
 * Legacy opt-out predicate used by the version check.
 *
 * Telemetry collection uses `isTelemetryOptedInByEnv` instead.
 */
export function isTelemetryOptedOutByEnv(env: NodeJS.ProcessEnv = process.env): boolean {
  return isTelemetryDisabledByEnv(env) || isDoNotTrackSet(env);
}
