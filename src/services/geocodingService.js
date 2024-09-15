const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/reverse';

export async function getCityFromCoordinates(latitude, longitude) {
  const url = `${NOMINATIM_BASE_URL}?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Extract city name from the response
    const city =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.hamlet ||
      'Unknown';

    return city;
  } catch (error) {
    console.error('Error fetching city name:', error);
    return 'Unknown';
  }
}
