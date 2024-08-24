import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { uploadFileToIPFS, uploadMetadataToIPFS } from './pinata'

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (file) {
      try {
        const fileUrl = await uploadFileToIPFS(file)
        setImage(fileUrl)
      } catch (error) {
        console.log("Pinata IPFS image upload error: ", error)
      }
    }
  }

  const createNFT = async () => {
    if (!image || !price || !name || !description) return
    try {
      const metadata = { image, price, name, description }
      const metadataUrl = await uploadMetadataToIPFS(metadata)
      mintThenList(metadataUrl)
    } catch (error) {
      console.log("Pinata IPFS metadata upload error: ", error)
    }
  }

  const mintThenList = async (metadataUrl) => {
    // console.log("hello")
    // mint nft 
    await (await nft.mint(metadataUrl)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  }

  return (
    <div className="container mx-auto mt-10">
  <div className="flex justify-center">
    <main role="main" className="w-full max-w-2xl">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <div className="space-y-6">
          <input
            type="file"
            required
            name="file"
            onChange={uploadToIPFS}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <input
            onChange={(e) => setName(e.target.value)}
            size="lg"
            required
            type="text"
            placeholder="Name"
            className="block w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Description"
            className="block w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            size="lg"
            required
            type="number"
            placeholder="Price in EDU"
            className="block w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex justify-center">
            <button
              onClick={createNFT}
              className="w-full py-3 mt-6 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create & List NFT!
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>

  )
}

export default Create
