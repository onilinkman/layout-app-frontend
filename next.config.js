/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler:{
		styledComponents:true
	},
	images:{
		remotePatterns:[
			{
				protocol:'http',
				hostname:"192.168.0.123",
				port:"8000",
				pathname:"/**"
			}
		]
	}
}

module.exports = nextConfig
