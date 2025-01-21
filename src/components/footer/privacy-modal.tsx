"use client";

import * as React from "react";
import { Button } from "./button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

export function PrivacyModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<span className="text-black hover:text-dynamic-green transition-colors cursor-pointer font-medium">
					Privacy Policy
				</span>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5 bg-white border-gray-200 text-black">
				<DialogHeader className="contents space-y-0 text-left">
					<DialogTitle className="border-b border-gray-200 px-6 py-4 text-base text-black">
						Privacy Policy
					</DialogTitle>
					<div className="overflow-y-auto">
						<DialogDescription asChild>
							<div className="px-6 py-4">
								<div className="space-y-8 [&_strong]:font-semibold [&_strong]:text-black">
									{/* Introduction paragraphs */}
									<div className="space-y-4">
										<p className="text-justify leading-relaxed">This Privacy Policy sets out our commitment to protecting the privacy of your personal information that we collect through our website (https://www.momoola.io) and application ("MoMoola App"). Please read this Privacy Policy carefully and contact us if you have any questions.</p>
										<p className="text-justify leading-relaxed">By providing us with personal information, you confirm that you have had sufficient opportunity to access this Privacy Policy and that you have read and accepted its terms. If you do not agree to this Privacy Policy, please do not provide us with your personal information.</p>
										<p className="text-justify leading-relaxed">This Privacy Policy may be amended from time to time in our sole discretion. Your continued use of our Website and App following any amendments indicates your acceptance of the updated Privacy Policy. We encourage you to check this Privacy Policy regularly.</p>
									</div>

									{/* Numbered sections */}
									<div className="space-y-6">
										{/* Section 1: Collection of Personal Information */}
										<div className="space-y-4">
											<h3 className="font-semibold text-lg">1. Collection of Personal Information</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">1.1. We may collect the following personal information from you:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">Name.</li>
													<li className="text-justify">Contact details.</li>
													<li className="text-justify">Financial and transactional information necessary for providing our services.</li>
												</ul>
												<p className="text-justify leading-relaxed">1.2. We collect personal information directly from you or through third parties who assist us in providing services, such as TransUnion, in compliance with Kenya's anti-money laundering (AML) and know-your-customer (KYC) regulations.</p>
												<p className="text-justify leading-relaxed">1.3. If you provide us with personal information about third parties, you warrant that you have obtained their consent to do so.</p>
											</div>
										</div>

										{/* Section 2: Use and Disclosure of Personal Information */}
										<div className="space-y-4">
											<h3 className="font-semibold text-lg">2. Use and Disclosure of Personal Information</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">2.1. We use your personal information for the following purposes:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">To contact and communicate with you.</li>
													<li className="text-justify">For internal record-keeping and administration.</li>
													<li className="text-justify">To provide you with access to financial services.</li>
													<li className="text-justify">For marketing purposes, where consented.</li>
													<li className="text-justify">For data analytics to improve our services.</li>
												</ul>
												<p className="text-justify leading-relaxed">2.2. We may disclose your personal information to:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">Courts, regulatory authorities, and law enforcement officers as required by Kenyan law.</li>
													<li className="text-justify">Third-party service providers who assist us in delivering our services or marketing communications.</li>
													<li className="text-justify">Third parties to collect and process data. All data is stored locally in Kenya in compliance with the Kenya Data Protection Act, 2019.</li>
												</ul>
												<p className="text-justify leading-relaxed">2.3. We require that all third parties handling your personal information adhere to this Privacy Policy and applicable data protection laws.</p>
											</div>
										</div>

										{/* Section 3: Change of Control */}
										<div className="space-y-4">
											<h3 className="font-semibold text-lg">3. Change of Control</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">3.1. In the event of a change of control of MoMoola, including a merger, acquisition, or sale of assets, we reserve the right to transfer our user databases, including personal information, to the new entity, provided such transfer complies with Kenyan law.</p>
											</div>
										</div>

										{/* Section 4: Storage and Security */}
										<div className="space-y-4">
											<h3 className="font-semibold text-lg">4. Storage and Security</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">4.1. Your personal information is stored on secure servers located in Kenya, in compliance with the Kenya Data Protection Act, 2019.</p>
												<p className="text-justify leading-relaxed">4.2. While we implement reasonable security measures to protect your personal information, we cannot guarantee that unauthorized access, hacking, data loss, or other breaches will not occur. You acknowledge that the transmission and exchange of information is carried out at your own risk.</p>
											</div>
										</div>

										{/* Section 5: Your Rights to Correct and Access Information */}
										<div className="space-y-4">
											<h3 className="font-semibold text-lg">5. Your Rights to Correct and Access Information</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">5.1. Providing us with your personal information is optional. However, failure to provide accurate or complete information may limit your ability to use our services.</p>
												<p className="text-justify leading-relaxed">5.2. You have the right to:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">Request details of the personal information we hold about you.</li>
													<li className="text-justify">Correct any inaccuracies in your personal information.</li>
													<li className="text-justify">Request the deletion of personal information where it is no longer required for the purpose for which it was collected.</li>
												</ul>
												<p className="text-justify leading-relaxed">5.3. To exercise your rights, please contact us. We will respond to requests within a reasonable timeframe.</p>
											</div>
										</div>

										{/* Section 6: Links to Third-Party Websites */}
										<div className="space-y-4">
											<h3 className="font-semibold text-lg">6. Links to Third-Party Websites</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">6.1. Our Website and App may contain links to third-party websites. These websites are not governed by this Privacy Policy. We are not responsible for the protection of any information you provide to third-party websites.</p>
											</div>
										</div>

										{/* Section 7: Cookies and Data Analytics */}
										<div className="space-y-4">
											<h3 className="font-semibold text-lg">7. Cookies and Data Analytics</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">7.1. We may use cookies, web beacons, and similar technologies to:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">Log information about your access to and use of our Website and App.</li>
													<li className="text-justify">Improve your user experience.</li>
													<li className="text-justify">Collect and process data using Google Analytics or similar services. For more details on how Google uses your data, visit https://google.com/policies/privacy/partners.</li>
												</ul>
											</div>
										</div>

										{/* Section 8: Marketing and Communications */}
										<div className="space-y-4">
											<h3 className="font-semibold text-lg">8. Marketing and Communications</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">8.1. You may opt into marketing communications by:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">Emailing us.</li>
													<li className="text-justify">Adjusting your preferences in the MoMoola App.</li>
													<li className="text-justify">Opting in during campaigns or promotions.</li>
												</ul>
												<p className="text-justify leading-relaxed">8.2. You may opt out of marketing communications at any time through the same channels.</p>
											</div>
										</div>

										{/* Section 9: Complaints */}
										<div className="space-y-4">
											<h3 className="font-semibold text-lg">9. Complaints</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">9.1. If you believe there has been a breach of this Privacy Policy or applicable data protection laws, please contact us with details of your complaint.</p>
												<p className="text-justify leading-relaxed">9.2. We will investigate and respond to your complaint within 10 business days, including outlining any actions we will take to resolve the issue.</p>
											</div>
										</div>

										{/* Contact information */}
										<div className="mt-10">
											<p>For further information about this Privacy Policy, please contact <a href="mailto:contact@momoola.io" className="text-dynamic-green hover:underline">contact@momoola.io</a></p>
										</div>
									</div>
								</div>
							</div>
						</DialogDescription>
					</div>
				</DialogHeader>
				<DialogFooter className="border-t border-gray-200 px-6 py-4 flex justify-end">
					<DialogClose asChild>
						<Button type="button" variant="default">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}


