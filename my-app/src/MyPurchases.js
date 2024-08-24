import { useState, useEffect } from 'react'
import { ethers, utils } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'

export default function MyPurchases({ marketplace, nft, account }) {
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])
  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
    const results = await marketplace.queryFilter(filter)
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(results.map(async i => {
      // fetch arguments from each result
      i = i.args
      // get uri url from nft contract
      const uri = await nft.tokenURI(i.tokenId)
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri)
      const metadata = await response.json()
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(i.itemId)
      // define listed item object
      let purchasedItem = {
        totalPrice,
        price: i.price,
        itemId: i.itemId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image
      }
      return purchasedItem
    }))
    setLoading(false)
    setPurchases(purchases)
  }
  useEffect(() => {
    loadPurchasedItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="py-10">
  <div className="container mx-auto px-4">
    {purchases.length > 0 ? (
      <>
        <h2 className="text-2xl font-bold text-center mb-6">Purchases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {purchases.map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={item.image} 
                alt={`Purchase Item ${idx}`} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-800 font-semibold">
                  {ethers.utils.formatEther(item.totalPrice)} EDU
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    ) : (
      <main className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-700">No purchases</h2>
      </main>
    )}
  </div>
</div>

  );
}