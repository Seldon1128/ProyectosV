import React, { Fragment, useEffect, useState } from 'react';
import useStore from '../store';
import { useForm } from 'react-hook-form';
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, Transition} from '@headlessui/react';
import { BsChevronExpand } from 'react-icons/bs';
import { BiCheck, BiLoader } from 'react-icons/bi';
import { fetchCountries } from '../libs';
import Input from './ui/input';
import { Button } from './ui/button';
import api from '../libs/apiCall';
import { toast } from 'sonner';

const SettingsForm = () => {
    const  {user, theme, setTheme} = useStore((state) => state);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {...user},
    });
    const [selectedCountry, setSelectedCountry] = useState(
        {country: user?.country, currency: user?.currency} || ""
    );
    const [query, setQuery] = useState("");
    const [countriesData, setCountriesData] = useState([]);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values) => {
        try{
            setLoading(true);
            const newData = {
                ...values,
                country: selectedCountry.country,
                currency:selectedCountry.currency,
            };
            const {data:res} = await api.put(`/user`, newData);

            if (res?.user){
                const newUser = {...res.user, token:user.token};
                localStorage.setItem("user", JSON.stringify(newUser));

                toast.success(res?.message);
            }
        } catch (error){
            console.error("Something went wrong: ", error);
            toast.error(error?.response?.data?.message || error.mesage);
        } finally {
            setLoading(false);
        }
    };

    const toggleTheme = (val) => {
        setTheme(val);
        localStorage.setItem("theme", val);
    };

    
    const filteredCountries = 
    query === ""
        ? countriesData
        : countriesData.filter((country) => 
            country.country
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
    
    const getCountriesList = async () => {
        const data = await fetchCountries();
        setCountriesData(data);
    };

    useEffect(() => {
        getCountriesList();
    },[]);

    const Countries = () => {
        return(
            <div className='w-full'>
                <Combobox value={selectedCountry} onChange={setSelectedCountry}>
                    <div className='relative mt-1'>
                        <div className=''>
                            <ComboboxInput
                                className='inputStyles'
                                displayValue={(country) => country?.country}
                                onChange = {(e) => setQuery(e.target.value)}
                            />
                            <ComboboxButton className='absolute inset-y-0 right-0 flex items-center pr-2'>
                                <BsChevronExpand className='text-gray-400'/>
                            </ComboboxButton>
                        </div>
                        <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                            afterLeave={() => setQuery("")}    
                        >
                            <ComboboxOption className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-900  py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                                { filteredCountries.length === 0 && query !== "" ? (
                                    <div className='relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-500'>
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredCountries?.map((country, index) => (
                                        <ComboboxOption
                                            key={country.country + index}
                                            className={({ active }) => 
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? "bg-violet-600/20 text-white"
                                                        : "text-gray-900"
                                                }`
                                            }
                                            value={country}
                                        >
                                            {({selected, active}) => (
                                                <>
                                                    <div className='flex items-center gap-2'>
                                                        <img
                                                            src={country?.flag}
                                                            alt={country.country}
                                                            className='w-8 h-5 rounded-sm object-cover'
                                                        />
                                                        <span
                                                            className={`block truncate text-gray-700 dark:text-gray-500 ${
                                                                selected ? "font-medium" : "font-normal"
                                                            }`}
                                                        >
                                                            {country?.country}
                                                        </span>
                                                    </div>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active ? "text-white" : "text-teal-600"
                                                            }`}
                                                        >
                                                            <BiCheck className='h-5 w-5' aria-hidden='true'/>
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </ComboboxOption>
                                    ))
                                )}
                            </ComboboxOption>
                        </Transition>
                    </div>
                </Combobox>
            </div>
        );
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='w-full'>
                <Input
                    disabled={loading}
                    id ="firstname"
                    label="First Name"
                    type="text"
                    placeholder={user?.firstname || ""}
                    error= {errors.firstname?.message}
                    {...register("firstname")}
                    className="inputStyle"
                />
            </div>
            <div className='w-full'>
                <Input
                    disabled={loading}
                    id ="lastname"
                    label="Last Name"
                    type="text"
                    placeholder={user?.lastname || ""}
                    error= {errors.lastname?.message}
                    {...register("lastname")}
                    className="inputStyle"
                />
            </div>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='w-full'>
                <Input
                    disabled={loading}
                    id ="email"
                    label="Email"
                    type="text"
                    placeholder={user?.email || ""}
                    error= {errors.email?.message}
                    {...register("email")}
                    className="inputStyle"
                />
            </div>
            <div className='w-full'>
                <Input
                    disabled={loading}
                    id ="contact"
                    label="Contact Phone"
                    type="text"
                    placeholder= {user?.contact || ""}
                    error= {errors.contact ? errors.contact.message : ""}
                    {...register("contact", {
                        required: "Contact is required!",
                    })}
                    className="inputStyle"
                />
            </div>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='w-full'>
                <span className='labelStyles'>Country</span>
                <Countries/>
            </div>

            <div className='w-full'>
                <span className='labelStyles'>Currency</span>
                <select className='inputStyles'>
                    <option>{selectedCountry?.currency || user?.country}</option>
                </select>
            </div>
        </div>

        <div className='flex items-center gap-6 justify-end pb-10 border-b-2 border-gray-200 dark:border-gray-800'>
            <Button
                variant="outline"
                
                type="reset"
                className='px-6 bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-700'
            >
                Reset
            </Button>
            <Button
                
                type="submit"
                className='px-8 bg-violet-800 text-white'
            >
            {loading ? <BiLoader className='animate-spin text-white'/> : "Save"}
            </Button>
        </div>

    </form>
  )
}

export default SettingsForm;
