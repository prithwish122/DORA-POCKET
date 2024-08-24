import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

const Home = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center py-10">
  {items.length > 0 ? (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-32 object-cover rounded-t-lg border-b-4 border-gray-300"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <button
                onClick={() => buyMarketItem(item)}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Buy for {ethers.utils.formatEther(item.totalPrice)} EDU
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <main className="py-10 text-center">
      <h2 className="text-xl font-semibold text-gray-700">No listed assets</h2>
    </main>
  )}
</div>

  );
}
export default Home