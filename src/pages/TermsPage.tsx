import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculator
            </Button>
          </Link>
        </div>

        <div className="font-mono space-y-8">
          <header className="border-b border-border pb-6">
            <h1 className="text-4xl font-bold text-primary mb-4">Terms & Conditions</h1>
            <p className="text-lg text-muted-foreground">
              Terms of use for the Grade Calculator application
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Last updated: January {new Date().getFullYear()}
            </p>
          </header>

          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  By accessing and using the Grade Calculator application ("the Service"), you accept 
                  and agree to be bound by the terms and provision of this agreement. If you do not 
                  agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These terms apply to all users of the Service, including without limitation users 
                  who are browsers, students, educators, and contributors of content.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">2. Description of Service</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  The Grade Calculator is an educational tool designed to help students calculate 
                  and track their academic grades. The Service provides:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Grade calculation based on Philippine academic grading standards</li>
                  <li>Multiple course tracking capabilities</li>
                  <li>Data storage in local browser storage</li>
                  <li>PDF export functionality</li>
                  <li>Mathematical formula visualization</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">3. User Responsibilities</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <h3 className="font-semibold">3.1 Accuracy of Information</h3>
                <p>
                  Users are responsible for ensuring the accuracy of all data entered into the 
                  calculator. The Service relies on user-provided information to perform calculations.
                </p>
                
                <h3 className="font-semibold mt-4">3.2 Academic Verification</h3>
                <p>
                  While the Service aims to provide accurate calculations, users must verify all 
                  final grades with their official academic institutions. The Service should not 
                  be used as the sole basis for academic decision-making.
                </p>
                
                <h3 className="font-semibold mt-4">3.3 Appropriate Use</h3>
                <p>
                  Users agree to use the Service only for legitimate educational purposes and in 
                  compliance with all applicable laws and regulations.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">4. Data and Privacy</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <h3 className="font-semibold">4.1 Local Storage</h3>
                <p>
                  All grade data is stored locally in your browser's storage. The Service does not 
                  collect, transmit, or store personal data on external servers.
                </p>
                
                <h3 className="font-semibold mt-4">4.2 Data Backup</h3>
                <p>
                  Users are responsible for backing up their data using the export functionality 
                  provided. Loss of browser data may result in permanent loss of grade information.
                </p>
                
                <h3 className="font-semibold mt-4">4.3 No Personal Information Collection</h3>
                <p>
                  The Service does not require registration or collection of personal information. 
                  All operations are performed locally within the user's browser.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Limitations and Disclaimers</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <h3 className="font-semibold">5.1 Accuracy Disclaimer</h3>
                <p>
                  While every effort has been made to ensure the accuracy of calculations, the 
                  Service is provided "as is" without warranty of any kind. Users should verify 
                  all calculations independently.
                </p>
                
                <h3 className="font-semibold mt-4">5.2 Educational Tool</h3>
                <p>
                  This Service is intended as an educational aid and should not replace official 
                  academic records or institutional grading systems. It is not affiliated with 
                  any educational institution.
                </p>
                
                <h3 className="font-semibold mt-4">5.3 No Academic Guarantees</h3>
                <p>
                  The Service makes no guarantees about academic outcomes or grade predictions. 
                  Actual grades may vary based on institutional policies and calculation methods.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Limitation of Liability</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  In no event shall the developer or contributors be liable for any direct, indirect, 
                  incidental, special, consequential, or punitive damages arising out of your use of 
                  the Service.
                </p>
                <p>
                  This includes but is not limited to damages for loss of profits, goodwill, use, 
                  data, or other intangible losses resulting from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use or inability to use the Service</li>
                  <li>Errors or inaccuracies in calculations</li>
                  <li>Loss of stored data</li>
                  <li>Academic decisions based on Service calculations</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Modifications</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  The developer reserves the right to modify these terms at any time. Changes will 
                  be effective immediately upon posting. Continued use of the Service after changes 
                  constitutes acceptance of the new terms.
                </p>
                <p>
                  Users are encouraged to review these terms periodically to stay informed of any updates.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Termination</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  Users may discontinue use of the Service at any time. The developer may modify 
                  or discontinue the Service with or without notice at any time.
                </p>
                <p>
                  Upon termination, all provisions of these terms which by their nature should 
                  survive termination shall survive, including but not limited to warranty 
                  disclaimers and limitations of liability.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">9. Governing Law</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  These terms shall be governed by and construed in accordance with applicable 
                  laws, without regard to conflict of law principles.
                </p>
                <p>
                  Any disputes arising from the use of this Service should be resolved through 
                  appropriate legal channels in the applicable jurisdiction.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">10. Contact Information</h2>
              <div className="bg-muted/30 p-6 rounded-lg space-y-4 text-sm">
                <p>
                  For questions about these Terms & Conditions, please contact:
                </p>
                 <p>
                   <strong>Developer:</strong> @09sychic<br />
                   <strong>Contact:</strong> 
                   <a 
                     href="https://m.me/09sychicc" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-primary hover:underline ml-2"
                   >
                     Facebook Messenger
                   </a>
                 </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;