export function convertMinutesToHM(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${hours}h, ${formattedMinutes}m`;
}