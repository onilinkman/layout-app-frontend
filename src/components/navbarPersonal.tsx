import {
	Avatar,
	Dropdown,
	DropdownDivider,
	DropdownHeader,
	DropdownItem,
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle,
} from "flowbite-react";

import img_photo from "@/../public/next.svg";
import Image from "next/image";
import ButtonTheme from "./buttonTheme";

export default function NavbarPersonal() {
	return (
		<Navbar className="sticky top-0 w-full z-20" fluid rounded>
			<NavbarBrand href="https://flowbite-react.com">
				<Image
					src={img_photo}
					height={58}
					width={58}
					alt="Flowbite React Logo"
				/>
				<span className="self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white">
					Flowbite React
				</span>
			</NavbarBrand>
			<div className="flex md:order-2">
				<Dropdown
					arrowIcon={false}
					inline
					label={
						<Avatar
							alt="User settings"
							img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
							rounded
						/>
					}
				>
					<DropdownHeader>
						<span className="block text-sm">Bonnie Green</span>
						<span className="block truncate text-sm font-medium">
							name@flowbite.com
						</span>
					</DropdownHeader>
					<DropdownItem>Dashboard</DropdownItem>
					<DropdownItem>Settings</DropdownItem>
					<DropdownItem>Earnings</DropdownItem>
					<DropdownDivider />
					<DropdownItem>Sign out</DropdownItem>
				</Dropdown>
				<NavbarToggle />
			</div>
			<NavbarCollapse>
				<NavbarLink href="/" active>
					Home
				</NavbarLink>
				<NavbarLink href="/calc">Calc</NavbarLink>
				<NavbarLink href="#">Services</NavbarLink>
				<NavbarLink href="#">Pricing</NavbarLink>
				<NavbarLink href="#">Contact</NavbarLink>
				<li><ButtonTheme/></li>
			</NavbarCollapse>
		</Navbar>
	);
}
