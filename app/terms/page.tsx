import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Service Agreement & Terms',
  description: 'Read our terms of service outlining the agreement between Devskrew and our clients for digital services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function Terms() {
  return (
    <div>
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Last updated: January 15, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing and using Devskrew's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2>Services</h2>
            <p>Devskrew provides digital services including but not limited to:</p>
            <ul>
              <li>Web development and design</li>
              <li>Digital marketing and SEO</li>
              <li>Mobile application development</li>
              <li>E-commerce solutions</li>
              <li>Analytics and consulting services</li>
              <li>Ongoing maintenance and support</li>
            </ul>

            <h2>Service Terms</h2>
            <h3>Project Scope</h3>
            <p>
              All projects begin with a detailed scope of work that outlines deliverables, timelines, and costs. Any changes to the agreed scope must be approved in writing and may result in additional charges.
            </p>

            <h3>Timeline and Delivery</h3>
            <p>
              We strive to meet all agreed-upon deadlines. However, timelines may be affected by factors including client feedback response times, content availability, and scope changes. We will communicate any potential delays promptly.
            </p>

            <h3>Client Responsibilities</h3>
            <p>Clients are responsible for:</p>
            <ul>
              <li>Providing necessary content, materials, and assets in a timely manner</li>
              <li>Responding to requests for feedback and approval within agreed timeframes</li>
              <li>Ensuring all provided content is accurate and legally compliant</li>
              <li>Maintaining backup copies of all website content and data</li>
            </ul>

            <h2>Payment Terms</h2>
            <h3>Pricing and Invoicing</h3>
            <p>
              All prices are quoted in USD and are subject to change with 30 days notice. Invoices are typically sent at project milestones or monthly for ongoing services. Payment is due within 30 days of invoice date unless otherwise agreed.
            </p>

            <h3>Late Payments</h3>
            <p>
              Late payments may result in service suspension and additional fees. Projects may be put on hold until payment is received. We reserve the right to charge interest on overdue accounts.
            </p>

            <h3>Refunds</h3>
            <p>
              Refunds are considered on a case-by-case basis. Work completed up to the point of cancellation is billable. Digital deliverables that have been provided cannot be returned and are non-refundable.
            </p>

            <h2>Intellectual Property</h2>
            <h3>Client Content</h3>
            <p>
              Clients retain ownership of all content, data, and materials provided to us. By providing content, clients grant us license to use, modify, and incorporate such content into the deliverables.
            </p>

            <h3>Developed Work</h3>
            <p>
              Upon full payment, clients receive ownership of custom-developed work. However, we retain rights to any pre-existing intellectual property, third-party components, and general methodologies used in the project.
            </p>

            <h3>Portfolio Rights</h3>
            <p>
              We reserve the right to display completed work in our portfolio and marketing materials unless explicitly prohibited by a signed non-disclosure agreement.
            </p>

            <h2>Warranties and Disclaimers</h2>
            <h3>Service Warranty</h3>
            <p>
              We warrant that our services will be performed in a professional manner. We will make reasonable efforts to correct any defects in our work at no additional charge for a period of 30 days after delivery.
            </p>

            <h3>Disclaimer</h3>
            <p>
              Our services are provided "as is" without warranty of any kind. We disclaim all warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall Devskrew be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with our services. Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.
            </p>

            <h2>Confidentiality</h2>
            <p>
              We respect the confidentiality of our clients' information and will not disclose confidential information to third parties without consent, except as required by law or as necessary to provide our services.
            </p>

            <h2>Termination</h2>
            <p>
              Either party may terminate services with written notice. Upon termination, all unpaid invoices become immediately due and payable. We will provide clients with copies of all work completed up to the termination date.
            </p>

            <h2>Force Majeure</h2>
            <p>
              Neither party shall be liable for any failure or delay in performance due to circumstances beyond their reasonable control, including but not limited to acts of God, natural disasters, government actions, or technical failures.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of New York State. Any disputes arising under these terms shall be resolved in the courts of New York.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of the modified terms.
            </p>

            <h2>Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us:</p>
            <ul>
              <li>Email: legal@Devskrew.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Innovation Ave, New York, NY 10001</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}