/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
// form
import { useFormik } from 'formik';
// @mui
import { Box, Card, Grid, TextField, Autocomplete, Stack, Typography, Button } from '@mui/material';
// utils
import { useDispatch, useSelector } from 'react-redux';
import { fData } from '../../../../utils/formatNumber';

import { UploadAvatar } from '../../../../components/upload';
import { updateStoreGeneralInfo, resetIsSubmittingStoreSetup, updateStore } from '../../../../actions';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const dispatch = useDispatch();

  const { store, isSubmittingStoreSetup } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(resetIsSubmittingStoreSetup());
  }, []);

  const formik = useFormik({
    initialValues: {
      storeName: store.storeName,
      state: store.state,
      city: store.city,
      address: store.address,
      pincode: store.pincode,
      landmark: store.landmark,
      phone: store.phone,
      emailAddress: store.emailAddress,
      gstin: store.gstin,
      storeURL: store.subName,
    },
    validateOnChange: true,
    validateOnBlur: true,
    // validateOnMount: true,
    validationSchema: Yup.object().shape({
      storeName: Yup.string().required('Store Name is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      address: Yup.string().required('Address is required'),
      pincode: Yup.string().required('Pincode is required'),
      landmark: Yup.string().required('Landmark is required'),
      emailAddress: Yup.string().required('Email Address is required'),
      gstin: Yup.string(),
      storeURL: Yup.string().required('Store URL is required'),
      phone: Yup.string().required('Phone is required'),
    }),
    onSubmit: async (values) => {
      // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

      let lat = 26.2662023;
      let long = 78.2081602;

      try {
        // Fetch current user details

        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${`${values.address} ${values.pincode} ${values.landmark} ${values.city} ${values.state}`}&key=AIzaSyC1WBMBtZMUzZs0xCzJETUzttOOvR8LsvU`,
          {
            method: 'GET',

            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const result = await res.json();

        if (!res.ok) {
          if (!res.message) {
            throw new Error('Something went wrong');
          } else {
            throw new Error(res.message);
          }
        }

        console.log(result);

        lat = result.data.results.geometry.location.lat;
        long = result.data.results.geometry.location.lng;
      } catch (error) {
        console.log(error);
      }

      const formValues = { ...values, lat, long, category, country };

      dispatch(updateStoreGeneralInfo(formValues, values.storeURL, file));
    },
  });

  const [country, setCountry] = useState(store.country);
  const [category, setCategory] = useState(store.category);

  const [shopLat, setShopLat] = useState(store.lat || 26.2662023);
  const [shopLong, setShopLong] = useState(store.long || 78.2081602);

  const [file, setFile] = useState();
  const [fileToPreview, setFileToPreview] = useState(
    store.logo && `https://qwikshop-in.s3.ap-south-1.amazonaws.com/${store.logo}`
  );

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setFile(file);
      try {
        setFileToPreview(URL.createObjectURL(file));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  setTimeout(() => {
    function showPosition(position) {
      if (!store.lat) {
        setShopLat(position.coords.latitude);
      }
      if (!store.long) {
        setShopLong(position.coords.longitude);
      }
    }

    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    let city;
    let infoWindow = '';
    const addressEl = document.querySelector('#map-search');
    const element = document.getElementById('map-canvas');

    if (addressEl && element) {
      const mapOptions = {
        // How far the maps zooms in.
        zoom: 10,
        // Current Lat and Long position of the pin/
        center: new window.google.maps.LatLng(shopLat, shopLong),
        disableDefaultUI: false, // Disables the controls like zoom control on the map if set to true
        scrollWheel: true, // If set to false disables the scrolling on the map.
        draggable: true, // If set to false , you cannot move the map around.
        // mapTypeId: google.maps.MapTypeId.HYBRID, // If set to HYBRID its between sat and ROADMAP, Can be set to SATELLITE as well.
        // maxZoom: 11, // Wont allow you to zoom more than this
        // minZoom: 9  // Wont allow you to go more up.
      };

      /**
       * Creates the map using google function google.maps.Map() by passing the id of canvas and
       * mapOptions object that we just created above as its parameters.
       *
       */
      // Create an object map with the constructor function Map()
      const map = new window.google.maps.Map(element, mapOptions); // Till this like of code it loads up the map.

      /**
       * Creates the marker on the map
       *
       */
      const marker = new window.google.maps.Marker({
        position: mapOptions.center,
        map,
        // icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
        draggable: true,
      });

      /**
       * Creates a search box
       */
      const searchBox = new window.google.maps.places.SearchBox(addressEl);

      /**
       * When the place is changed on search box, it takes the marker to the searched location.
       */
      window.google.maps.event.addListener(searchBox, 'places_changed', () => {
        const places = searchBox.getPlaces();
        const bounds = new window.google.maps.LatLngBounds();
        let i;
        let place;
        const addresss = places[0].formatted_address;

        for (i = 0; (place = places[i]); i++) {
          bounds.extend(place.geometry.location);
          marker.setPosition(place.geometry.location); // Set marker position new.
        }

        map.fitBounds(bounds); // Fit to the bound
        map.setZoom(15); // This function sets the zoom to 15, meaning zooms to level 15.
        // console.log( map.getZoom() );

        const lat = marker.getPosition().lat();
        const long = marker.getPosition().lng();
        setShopLat(lat);
        setShopLong(long);

        const resultArray = places[0].address_components;

        let citi;

        // Get the city and set the city input value to the one selected
        for (let a = 0; a < resultArray.length; a++) {
          if (resultArray[i].types[0] && resultArray[i].types[0] === 'administrative_area_level_2') {
            citi = resultArray[i].long_name;
            // city.value = citi;
          }
        }

        // Closes the previous info window if it already exists
        if (infoWindow) {
          infoWindow.close();
        }
        /**
         * Creates the info Window at the top of the marker
         */
        infoWindow = new window.google.maps.InfoWindow({
          content: addresss,
        });

        infoWindow.open(map, marker);
      });

      /**
       * Finds the new position of the marker when the marker is dragged.
       */
      window.google.maps.event.addListener(marker, 'dragend', (event) => {
        let address;
        let resultArray;
        let citi;

        console.log('i am dragged');
        const lat = marker.getPosition().lat();
        const long = marker.getPosition().lng();
        setShopLat(lat);
        setShopLong(long);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ latLng: marker.getPosition() }, (result, status) => {
          if (status === 'OK') {
            // This line can also be written like if ( status == google.maps.GeocoderStatus.OK ) {
            address = result[0].formatted_address;
            resultArray = result[0].address_components;

            // Get the city and set the city input value to the one selected
            for (let i = 0; i < resultArray.length; i++) {
              if (resultArray[i].types[0] && resultArray[i].types[0] === 'administrative_area_level_2') {
                citi = resultArray[i].long_name;
                console.log(citi);
                // city.value = citi;
              }
            }
            addressEl.value = address;
            // latEl.value = lat;
            // longEl.value = long;
          } else {
            console.log(`Geocode was not successful for the following reason: ${status}`);
          }

          // Closes the previous info window if it already exists
          if (infoWindow) {
            infoWindow.close();
          }

          /**
           * Creates the info Window at the top of the marker
           */
          infoWindow = new window.google.maps.InfoWindow({
            content: address,
          });

          infoWindow.open(map, marker);
        });
      });
    }
  }, 1000);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center', mb: 3 }}>
            <Typography variant="h6" className="mb-3">
              Store Logo
            </Typography>
            <UploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              file={fileToPreview}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
            <Stack sx={{ mt: 4 }} direction="row" alignItems={'center'} justifyContent="center">
              <Button
                onClick={() => {
                  dispatch(updateStoreGeneralInfo({}, store.subName, file));
                }}
                type="button"
                variant="contained"
                color="primary"
              >
                Update Logo
              </Button>
            </Stack>
          </Card>
          <Card sx={{ py: 10, px: 3 }}>
            <Typography className="mb-3">
              <strong>qwikshop.online/</strong> <span>{formik.values.storeURL}</span>
            </Typography>
            <TextField
              value={formik.values.storeURL}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              fullWidth
              label="Store URL"
              variant="outlined"
              name="storeURL"
              error={!!formik.touched.storeURL && !!formik.errors.storeURL}
              helperText={formik.touched.storeURL && formik.errors.storeURL}
            />
            <Stack sx={{ mt: 4 }} direction="row" alignItems={'center'} justifyContent="end">
              <Button
                type="button"
                onClick={() => {
                  dispatch(updateStoreGeneralInfo({}, formik.values.storeURL, null));
                }}
                variant="contained"
                color="primary"
              >
                Update URL
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <TextField
                value={formik.values.storeName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                label="Store Name"
                variant="outlined"
                name="storeName"
                error={!!formik.touched.storeName && !!formik.errors.storeName}
                helperText={formik.touched.storeName && formik.errors.storeName}
              />

              <Autocomplete
                required
                value={country}
                onChange={(e, value) => {
                  setCountry(value);
                }}
                id=""
                fullWidth
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: '', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <TextField
                value={formik.values.state}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                label="State"
                variant="outlined"
                name="state"
                error={!!formik.touched.state && !!formik.errors.state}
                helperText={formik.touched.state && formik.errors.state}
              />
              <TextField
                value={formik.values.city}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                label="Pincode"
                variant="outlined"
                name="city"
                error={!!formik.touched.city && !!formik.errors.city}
                helperText={formik.touched.city && formik.errors.city}
              />
              <TextField
                value={formik.values.address}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                label="Address"
                variant="outlined"
                name="address"
                error={!!formik.touched.address && !!formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
              />
              <TextField
                value={formik.values.pincode}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                label="Pincode"
                variant="outlined"
                name="pincode"
                error={!!formik.touched.pincode && !!formik.errors.pincode}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
              <TextField
                value={formik.values.landmark}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                label="Landmark"
                variant="outlined"
                name="landmark"
                error={!!formik.touched.landmark && !!formik.errors.landmark}
                helperText={formik.touched.landmark && formik.errors.landmark}
              />
              <TextField
                value={formik.values.gstin}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                label="GSTIN (OPTIONAL)"
                variant="outlined"
                name="gstin"
                error={!!formik.touched.gstin && !!formik.errors.gstin}
                helperText={formik.touched.gstin && formik.errors.gstin}
              />
              <Autocomplete
                required
                value={category}
                onChange={(e, value) => {
                  setCategory(value);
                }}
                fullWidth
                disablePortal
                autoHighlight
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.label === value.label}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                    {option.label}
                  </Box>
                )}
                options={categoryOptions}
                renderInput={(params) => <TextField required {...params} label="Category" fullWidth name="category" />}
              />

              <TextField
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                label="Phone"
                variant="outlined"
                name="phone"
                error={!!formik.touched.phone && !!formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <TextField
                value={formik.values.emailAddress}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                label="Email Address"
                variant="outlined"
                name="emailAddress"
                error={!!formik.touched.emailAddress && !!formik.errors.emailAddress}
                helperText={formik.touched.emailAddress && formik.errors.emailAddress}
              />
            </Stack>
          </Card>

          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <Button disabled={!formik.isValid} type="submit" variant="contained" loading={isSubmittingStoreSetup}>
              Save Changes
            </Button>
          </Stack>
          <Box sx={{ p: 2 }}>
            <TextField sx={{ mb: 2 }} id="map-search" placeholder="Location" label="location" fullWidth />
            {/*  */}
            <div id="map-canvas" style={{ width: '100%', height: '500px' }}>
              {/*  */}
            </div>
            <Stack sx={{ my: 2 }} direction={'row'} alignItems="center" justifyContent={'end'}>
              <Button
                onClick={() => {
                  dispatch(updateStore({ lat: shopLat, long: shopLong }));
                }}
                variant="contained"
              >
                Update Map Location
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

const categoryOptions = [
  {
    label: 'Kirana store, Grocery & FMCG',
    image: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-12/211213-wee-groceries-se-405p-a36212.jpg',
  },
  {
    label: 'Restaurants & Hotels',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/09/37/8b/94/metro-lounge.jpg',
  },
  {
    label: 'Fashion, Apparel, Shoes & Accessories',
    image: 'https://mms-images.out.customink.com/mms/images/catalog/categories/13_large.jpg',
  },
  {
    label: 'Fruits & vegetables',
    image: 'https://static.scientificamerican.com/sciam/cache/file/528E0B49-CDD0-42D4-B5BAA3EBAEC01AE6_source.jpg',
  },
  {
    label: 'Mobile, Computers & Other Accessories',
    image:
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000',
  },
  {
    label: 'Books & Stationary products',
    image: 'https://m.media-amazon.com/images/I/717EIB64t7L._SL1500_.jpg',
  },
  {
    label: 'Beauty & Cosmetics',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmncqVXZMJkFNp6-OOjCKUl_kxiuWm4AjvG_lKKqzAq956scFZERXWq56fXUEWYqC0WM&usqp=CAU',
  },
  {
    label: 'Electronic appliances',
    image:
      'https://cdn.vox-cdn.com/thumbor/Atvpj5tUuIgLq55pPrG2-A-MHF8=/0x389:8426x7181/1200x800/filters:focal(3671x2467:5117x3913)/cdn.vox-cdn.com/uploads/chorus_image/image/62795169/samsung_fridge.0.jpg',
  },
  {
    label: 'Home decoration',
    image: 'https://www.mymove.com/wp-content/uploads/2021/03/Home-decorating_Followtheflow_Shutterstock.jpg',
  },
  {
    label: 'Furniture',
    image: 'https://www.ikea.com/in/en/images/products/ektorp-2-seat-sofa__0818550_pe774481_s5.jpg?f=s',
  },
  {
    label: 'Pharmacy & Medical Care',
    image:
      'https://i.guim.co.uk/img/media/65d68c03a1e035d0670711a642f7a272d3e660eb/0_1216_3063_1838/master/3063.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3056330a3a98cf23d2dfcbe60ba711ad',
  },
  {
    label: 'Bakery & Cake shops',
    image: 'https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a.jpg',
  },
  {
    label: 'Fresh chicken, Fish & Meat',
    image:
      'https://static.freshtohome.com/media/catalog/product/cache/1/image/600x400/18ae109e34f485bd0b0c075abec96b2e/c/h/chicken-breast.jpg',
  },
  {
    label: 'Local & Online services',
    image:
      'https://www.schroederplumbing.com/wp-content/uploads/2020/10/Modern-Plumbing-Technology-Old-School-Experience-And-Integrity-From-Your-Plumber-_-Mesa-AZ.jpg',
  },
  {
    label: 'Jwellery, Gold and Gems',
    image:
      'https://www.candere.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/n/m/nmne3517-a.jpg',
  },
  {
    label: 'Insurance & Financial services',
    image:
      'https://m.economictimes.com/thumb/msid-72304068,width-1200,height-900,resizemode-4,imgsize-191408/money10-getty.jpg',
  },
  {
    label: 'Paan shop',
    image: 'https://www.ugaoo.com/knowledge-center/wp-content/uploads/2017/10/shutterstock_613072169.jpg',
  },
  {
    label: 'Gym & Sports equipment',
    image: 'https://content.presspage.com/uploads/2110/1920_gym-covid-19-mask-risk-gettyimages.jpg?10000',
  },
  {
    label: 'Educational institute, Schools & teachers',
    image:
      'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F60cb2948d2b1ff3c9b86dc9c%2FBlack-teacher-wearing-face-mask-while-explaining-math-lesson-in-the-classroom-%2F960x0.jpg%3Ffit%3Dscale',
  },
  {
    label: 'Hardware & Construction tools',
    image: 'https://laysantechnologies.com/CKeditor/Images/hardwares.png',
  },
  {
    label: 'Transportation, Taxi, Travel & Tourism',
    image:
      'https://media.wired.com/photos/5cf832279c2a7cd3975976ca/2:1/w_2000,h_1000,c_limit/Transpo_XcelsiorChargeCharging_TA.jpg',
  },
  {
    label: 'Car, bike, Tractor & vehicle accessories',
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-honda-civic-sedan-1558453497.jpg?crop=1xw:0.9997727789138833xh;center,top&resize=480:*',
  },
];

const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387',
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    suggested: true,
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61',
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243',
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236',
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242',
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true,
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809',
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500',
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691',
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true,
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500',
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672',
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246',
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98',
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    suggested: true,
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869',
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850',
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856',
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373',
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590',
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389',
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670',
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508',
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970',
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47',
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239',
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721',
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963',
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649',
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262',
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868',
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan, Province of China',
    phone: '886',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255',
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340',
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];
