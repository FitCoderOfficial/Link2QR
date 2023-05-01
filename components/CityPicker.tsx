"use client"

import { Country, City} from "country-state-city"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select"
import { GlobeIcon } from "@heroicons/react/solid"


type option = {
  value: {
    latetude: string,
    longitude: string,
    isoCode: string,
  },
  label: string,
} | null;

type cityOption = {
  value: {
    latetude: string,
    longitude: string,
    country: string,
    name: string,
    stateCode: string,
  },
  label: string,
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latetude:country.latitude,
    longitude:country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name 

}))


function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const router = useRouter();

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  }
  return (
    <div>
      <div className="flex items-center space-x-2 text-white/80">
        <GlobeIcon className="h-5 w-5 text-white" />
        <label htmlFor="country">Country</label>
      </div>
      <Select 
      className="text-black"z
      value={selectedCountry}
      onChange={handleSelectedCountry}
      options={options} />
    </div>
  )
}

export default CityPicker