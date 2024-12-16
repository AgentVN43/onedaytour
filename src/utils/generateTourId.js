
export const generateTourId = (departure, destination,selectedVehicle, getProvinceCode) => {
    const depCode = getProvinceCode(departure);
    const destCode = getProvinceCode(destination);

    const timestamp = Date.now().toString().slice(-5);
    const randomNum = Math.floor(100 + Math.random() * 900);
    const uniqueOrder = `${timestamp}${randomNum}`;

    return `${depCode}${destCode}-${uniqueOrder}-${randomNum}${selectedVehicle}`;
};