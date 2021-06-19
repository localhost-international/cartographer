export type Bookmark = {
	"displayName": String
	"description": String
	"protocol": "http" | "https" | "ipfs" | "hyper" | "dat"
	"location": String
	"tags": String[]
}