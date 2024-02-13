"use client";

import { Button, Sidebar } from "flowbite-react";
import Link from "next/link";
import {
	HiArrowSmRight,
	HiChartPie,
	HiInbox,
	HiMenu,
	HiShoppingBag,
	HiTable,
	HiUser,
	HiViewBoards,
} from "react-icons/hi";
// className="h-[calc(100vh-60px)] fixed md:relative top-60px transition-transform -translate-x-[600px] md:translate-x-0 "
function SidebarComponent() {
	return (
		<>
			<Button
				className=" w-[50px] h-[50px] fixed left-0 top-[60px] border-none  dark:bg-gray-800"
				data-drawer-target="default-sidebar"
				data-drawer-toggle="default-sidebar"
				color="gray"
			>
				<HiMenu size={40} />
			</Button>

			{/* <aside
				id="default-sidebar"
				className="fixed md:relative default-sidebar top-0 left-0 z-40 w-64 h-[calc(100vh-60px)] transition-transform -translate-x-full md:translate-x-0 "
				aria-label="Sidebar"
			> */}
			<Sidebar
				id="default-sidebar"
				className="fixed md:relative default-sidebar top-0 left-0 z-40 w-64 h-[calc(100vh-60px)] transition-transform -translate-x-full md:translate-x-0 "
				aria-label="Sidebar"
				aria-hidden={true}
			>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item href="#" icon={HiChartPie}>
							Dashboard
						</Sidebar.Item>
						<Sidebar.Item
							href="/catalogos/agregarItem"
							as={Link}
							icon={HiViewBoards}
							label="Pro"
							labelColor="dark"
						>
							Agregar Item
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiInbox} label="3">
							Inbox
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiUser}>
							Users
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiShoppingBag}>
							Products
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiArrowSmRight}>
							Sign In
						</Sidebar.Item>
						<Sidebar.Item href="#" icon={HiTable}>
							Sign Up
						</Sidebar.Item>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
			{/* </aside> */}
		</>
	);
}

export default SidebarComponent;
