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

export function TermsModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<span className="text-black hover:text-dynamic-green transition-colors cursor-pointer">
					Terms & Conditions
				</span>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-0 p-0 h-[100dvh] sm:h-auto sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5 bg-white border-gray-200 text-black">
				<DialogHeader className="contents space-y-0 text-left">
					<DialogTitle className="border-b border-gray-200 px-6 py-4 text-base text-black">
						Terms & Conditions
					</DialogTitle>
					<div className="overflow-y-auto">
						<DialogDescription asChild>
							  <div className="px-6 py-4">
								<div className="space-y-8 [&_strong]:font-semibold [&_strong]:text-black">
								  {/* Introduction paragraphs */}
								  <div className="space-y-4">
										<p className="text-justify leading-relaxed">These Terms of Use govern your access to and use of our website and application ("App"). Please read these Terms of Use carefully, and contact us if you have any questions. By using our Website or App, you confirm that you have read, understood, and agreed to these Terms of Use and that you have the legal capacity to accept them.</p>
										<p className="text-justify leading-relaxed">MoMoola is incorporated in the United Kingdom but provides services exclusively to residents of Kenya. These Terms of Use are tailored for users accessing MoMoola's services in Kenya. If you do not agree to these Terms of Use, please refrain from using our Website or App.</p>
										<p className="text-justify leading-relaxed">We are committed to protecting your privacy. By agreeing to these Terms of Use, you also agree to the terms in our privacy policy.</p>
									</div>

									{/* Numbered sections */}
									<div className="space-y-6">
										<div className="space-y-4">
											<h3 className="font-semibold text-lg">1. Licence</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">1.1. We grant you a non-exclusive, royalty-free, revocable, worldwide, non-transferable right and licence to use our Website and App for your personal use in accordance with these Terms of Use.</p>
												<p className="text-justify leading-relaxed">1.2. This licence is strictly for accessing MoMoola's services in Kenya and does not extend to jurisdictions outside Kenya.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">2. Intellectual Property Rights</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">2.1. Our Website and App contain material which is owned by or licensed to us and is protected by international laws, including trademarks, trade names, software, content, design, images, graphics, layout, and appearance.</p>
												<p className="text-justify leading-relaxed">2.2. As between you and us, we retain all intellectual property rights to our Website, App, and services. Nothing in these Terms of Use constitutes a transfer of ownership of these rights to you.</p>
												<p className="text-justify leading-relaxed">2.3. You may not use, reproduce, or distribute our intellectual property without our express written permission.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">3. User Content</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">3.1. We allow you to post content on our Website and App ("User Content"). You are solely responsible for the User Content that you post.</p>
												<p className="text-justify leading-relaxed">3.2. When you post User Content, you:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">warrant that you have all necessary rights to do so;</li>
													<li className="text-justify">grant us a perpetual, non-exclusive, royalty-free, irrevocable, worldwide, transferable licence to use, reproduce, modify, and distribute the content; and</li>
													<li className="text-justify">waive any moral rights in the content.</li>
												</ul>
												<p className="text-justify leading-relaxed">3.3. User Content must comply with Kenyan laws, including the Computer Misuse and Cybercrimes Act, 2018, and must not infringe the rights of others.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">4. Prohibited Conduct</h3>
											<div className="space-y-3">
												<p className="text-justify">4.1. You must not:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">use our Website or App for illegal activities, including those that violate Kenyan laws;</li>
													<li className="text-justify">post or transmit harmful, defamatory, obscene, or offensive content;</li>
													<li className="text-justify">use our Website or App to distribute unauthorized advertisements or solicitations;</li>
													<li className="text-justify">attempt to hack, reverse-engineer, or disrupt our systems; or</li>
													<li className="text-justify">engage in any conduct that would bring MoMoola into disrepute.</li>
												</ul>
												<p className="text-justify">4.2. We reserve the right to remove User Content or block your access to our Website or App if we believe you have violated these Terms of Use.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">5. User Obligations</h3>
											<div className="space-y-3">
												<p className="text-justify">5.1. Users are obligated to:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">Provide accurate, complete, and up-to-date personal and financial information when using MoMoola's services.</li>
													<li className="text-justify">Comply with Kenyan laws and regulations, including those relating to anti-money laundering (AML) and know-your-customer (KYC) requirements.</li>
													<li className="text-justify">Ensure the security and confidentiality of their account credentials.</li>
													<li className="text-justify">Notify MoMoola immediately of any unauthorized access or suspected breach of security.</li>
												</ul>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">6. Information Disclaimer</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">6.1. Any information provided on our Website or App, including recommendations and opinions, is for general purposes only and does not constitute financial advice.</p>
												<p className="text-justify leading-relaxed">6.2. MoMoola is not liable for reliance on information provided on its Website or App. Users are encouraged to consult with licensed financial advisors in Kenya where necessary.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">7. Third-Party Links</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">7.1. Our Website and App may contain links to third-party websites or services. MoMoola does not endorse or assume liability for these external sites.</p>
												<p className="text-justify leading-relaxed">7.2. Accessing third-party links is at your own risk, and you are responsible for complying with the applicable laws and terms of use of those sites.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">8. Accessibility and Service Continuity</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">8.1. MoMoola strives to ensure its Website and App are accessible. However, we do not guarantee uninterrupted access.</p>
												<p className="text-justify leading-relaxed">8.2. MoMoola may temporarily suspend services for maintenance or upgrades without prior notice.</p>
												<p className="text-justify leading-relaxed">8.3. Users acknowledge that internet and network disruptions specific to Kenya may affect service availability.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">9. Data Storage and Compliance</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">9.1. User data is stored locally in Kenya in accordance with the Kenya Data Protection Act, 2019.</p>
												<p className="text-justify leading-relaxed">9.2. MoMoola ensures compliance with Kenyan data laws, and data transfers, if any, are carried out in line with applicable regulations.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">10. Refunds</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">10.1. Financial Service Providers (FSPs) are entitled to refunds in accordance with the contractual agreements they have with MoMoola.</p>
												<p className="text-justify leading-relaxed">10.2. Users are advised to review the specific terms of their agreements for refund eligibility and processes.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">11. Termination</h3>
											<div className="space-y-3">
												<p className="text-justify">11.1. MoMoola reserves the right to terminate or suspend accounts in cases of:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">Illegal or dishonest behavior;</li>
													<li className="text-justify">Breaches of agreed contractual terms;</li>
													<li className="text-justify">Activities that violate Kenyan laws or these Terms of Use.</li>
												</ul>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">12. Dispute Resolution</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">12.1. Disputes arising from the use of MoMoola's services shall be resolved in accordance with the contractual agreements between the parties.</p>
												<p className="text-justify leading-relaxed">12.2. In the absence of specific agreements, disputes will be subject to Kenyan law and resolved through arbitration or mediation as appropriate.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">13. Opt-In and Opt-Out for Marketing Communications</h3>
											<div className="space-y-3">
												<p className="text-justify">13.1. Users can opt into marketing communications by:</p>
												<ul className="list-disc pl-6 space-y-2">
													<li className="text-justify">Emailing support;</li>
													<li className="text-justify">Selecting opt-in options during campaigns; or</li>
													<li className="text-justify">Adjusting preferences in the MoMoola App.</li>
												</ul>
												<p className="text-justify leading-relaxed">13.2. Users can opt out of marketing communications through the same channels.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">14. Fraud and Unauthorized Access</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">14.1. MoMoola reserves the right to investigate and address suspected fraud or unauthorized account activity.</p>
												<p className="text-justify leading-relaxed">14.2. Users are required to report any suspicious activity to MoMoola immediately.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">15. Governing Law and Jurisdiction</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">15.1. These Terms of Use are governed by the laws of Kenya with respect to services provided to Kenyan residents.</p>
												<p className="text-justify leading-relaxed">15.2. As MoMoola is incorporated in the UK, corporate governance matters fall under the jurisdiction of England and Wales.</p>
											</div>
										</div>

										<div className="space-y-4">
											<h3 className="font-semibold text-lg">16. Amendments</h3>
											<div className="space-y-3">
												<p className="text-justify leading-relaxed">16.1. MoMoola reserves the right to amend these Terms of Use at any time. Changes will be communicated via our Website or App, and continued use indicates acceptance of updated terms.</p>
											</div>
										</div>

										<div className="mt-10">
											<p>For inquiries, please contact <a href="mailto:contact@momoola.io" className="text-dynamic-green hover:underline">contact@momoola.io</a></p>
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


