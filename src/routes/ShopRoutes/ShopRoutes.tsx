import { ContactLensesForm, Eyeglasses, Lenses, Sunglasses } from 'components'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const ShopRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Eyeglasses />} />
      <Route path="Eyeglasses" element={<Eyeglasses />} />
      <Route path="Sunglasses" element={<Sunglasses />} />
      <Route path="ContactLenses" element={<ContactLensesForm />} />
      <Route path="lenses" element={<Lenses />} />
    </Routes>
  )
}

export default ShopRoutes