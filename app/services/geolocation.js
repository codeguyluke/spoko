const DEFAULT_REGION = {
  latitude: 51.507242,
  longitude: -0.127614,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
}
const GEOLOCATION_DISTANCE_FILTER = 10
const GEOLOCATION_TIMEOUT = 2000

const getCurrentRegion = () =>
  new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      position =>
        resolve({
          ...DEFAULT_REGION,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      () => resolve(DEFAULT_REGION),
      {
        timeout: GEOLOCATION_TIMEOUT,
        distanceFilter: GEOLOCATION_DISTANCE_FILTER,
      }
    )
  })

export { getCurrentRegion }
