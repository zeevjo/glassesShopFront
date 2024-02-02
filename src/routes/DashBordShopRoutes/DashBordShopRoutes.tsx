import { ContactLensesForm, DashBordShop, Eyeglasses, Lenses, Sunglasses } from 'components'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const DashBordShopRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<DashBordShop />} /> */}
      <Route path="Eyeglasses" element={<Eyeglasses />} />
      <Route path="Sunglasses" element={<Sunglasses />} />
      <Route path="ContactLenses" element={<ContactLensesForm />} />
      <Route path="Lenses" element={<Lenses />} />
    </Routes>
  )
}

export default DashBordShopRoutes