"use client"

import { Country, City} from "country-state-city"
import Select from "react-select"


const options = Country.getAllCountries().map((country) => ({
  value: {
    latetude:country.latitude,
    longitude:country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name 

}))


function CityPicker() {
  return (
    <div>
      <Select options={options} />
    </div>
  )
}

export default CityPicker