<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>appraisal form</title>
	<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
	<style>
		body{
			margin : 20px;
		}
		.form{
			width: 50%;
			border: 1px solid gray;
			padding: 20px;
			margin: 0 auto;
		}
		legend{
			color: green;
		}
		h3{
			text-align: center;
		}
	</style>
</head>
<body>
	<h3>Appraisal Form</h2>
		<hr>
		<div class = "form">
			<form action="process.php" method="post">
				<fieldset>
					<legend>Lender/Company Information</legend>
				
				  <div class="form-group">
				    <label for="lender-name">Lender Name</label>
				    <input type="text" class="form-control" name = "lender-name" id="lender-name" placeholder="Lender Name">
				  </div>
				  <div class="form-group">
				    <label for="lender-address1">Address Line 1</label>
				    <input type="text" class="form-control" name = "lender-address1" id="lender-address1" placeholder="Address Line 1">
				  </div>
				  <div class="form-group">
				    <label for="lender-address2">Address Line 2</label>
				    <input type="text" class="form-control" name = "lender-address2" id="lender-address2" placeholder="Address Line 2">
				  </div>
				  <div class="form-group">
				    <label for="lender-city">City</label>
				    <input type="text" class="form-control" name = "lender-city" id="lender-city" placeholder="City">
				  </div>
				  <div class = "form-group">
				  	<label for="lender-state">State</label>
				  	<br>
				  	<select name = "lender-state" class="form-control">
						<option value="AL">Alabama</option>
						<option value="AK">Alaska</option>
						<option value="AZ">Arizona</option>
						<option value="AR">Arkansas</option>
						<option value="CA">California</option>
						<option value="CO">Colorado</option>
						<option value="CT">Connecticut</option>
						<option value="DE">Delaware</option>
						<option value="DC">District Of Columbia</option>
						<option value="FL">Florida</option>
						<option value="GA">Georgia</option>
						<option value="HI">Hawaii</option>
						<option value="ID">Idaho</option>
						<option value="IL">Illinois</option>
						<option value="IN">Indiana</option>
						<option value="IA">Iowa</option>
						<option value="KS">Kansas</option>
						<option value="KY">Kentucky</option>
						<option value="LA">Louisiana</option>
						<option value="ME">Maine</option>
						<option value="MD">Maryland</option>
						<option value="MA">Massachusetts</option>
						<option value="MI">Michigan</option>
						<option value="MN">Minnesota</option>
						<option value="MS">Mississippi</option>
						<option value="MO">Missouri</option>
						<option value="MT">Montana</option>
						<option value="NE">Nebraska</option>
						<option value="NV">Nevada</option>
						<option value="NH">New Hampshire</option>
						<option value="NJ">New Jersey</option>
						<option value="NM">New Mexico</option>
						<option value="NY">New York</option>
						<option value="NC">North Carolina</option>
						<option value="ND">North Dakota</option>
						<option value="OH">Ohio</option>
						<option value="OK">Oklahoma</option>
						<option value="OR">Oregon</option>
						<option value="PA">Pennsylvania</option>
						<option value="RI">Rhode Island</option>
						<option value="SC">South Carolina</option>
						<option value="SD">South Dakota</option>
						<option value="TN">Tennessee</option>
						<option value="TX">Texas</option>
						<option value="UT">Utah</option>
						<option value="VT">Vermont</option>
						<option value="VA">Virginia</option>
						<option value="WA">Washington</option>
						<option value="WV">West Virginia</option>
						<option value="WI">Wisconsin</option>
						<option value="WY">Wyoming</option>
					</select>				
				  </div>
				  <div class="form-group">
				    <label for="lender-zip">Zip</label>
				    <input type="number" class="form-control" name = "lender-zip" id="lender-zip" placeholder="Zip">
				  </div>
				  <div class="form-group">
				    <label for="lender-phone">Phone</label>
				    <input type="tel" class="form-control" name = "lender-phone" id="lender-phone" placeholder="Phone">
				  </div>
				  <div class="form-group">
				    <label for="lender-fax">Fax</label>
				    <input type="tel" class="form-control" name = "lender-fax" id="lender-fax" placeholder="Fax">
				  </div>
				  <div class="form-group">
				    <label for="processor-name">Processor/Originator Name</label>
				    <input type="text" class="form-control" name = "processor-name" id="processor-name" placeholder="Processor/Original Name">
				  </div>
				  <div class="form-group">
				    <label for="lender-email">Email Address</label>
				    <input type="email" class="form-control" name = "lender-email" id="lender-email" placeholder="Email Address">
				  </div>
				  <div class="form-group">
				    <label for="email-for-ca">Email Address for Completed Appraisal</label>
				    <input type="email" class="form-control" name = "email-for-ca" id="email-for-ca" placeholder="Email Address for Completed Appraisal">
				  </div> 
			  </fieldset>

			  <fieldset>
					<legend>Borrower/Homeowner Information</legend>
				
				  <div class="form-group">
				    <label for="borrower-name">Borrower(s)</label>
				    <input type="text" class="form-control" name = "borrower-name" id="borrower-name" placeholder="Borrower Name">
				  </div>
				  <div class="form-group">
				    <label for="property-address1">Address Line 1</label>
				    <input type="text" class="form-control" name = "property-address1" id="property-address1" placeholder="Address Line 1">
				  </div>
				  <div class="form-group">
				    <label for="property-address2">Address Line 2</label>
				    <input type="text" class="form-control" name = "property-address2" id="property-address2" placeholder="Address Line 2">
				  </div>
				  <div class="form-group">
				    <label for="borrower-city">City</label>
				    <input type="text" class="form-control" name = "borrower-city" id="borrower-city" placeholder="City">
				  </div>
				  <div class = "form-group">
				  	<label for="borrower-state">State</label>
				  	<br>
				  	<select name = "borrower-state" class="form-control">
						<option value="AL">Alabama</option>
						<option value="AK">Alaska</option>
						<option value="AZ">Arizona</option>
						<option value="AR">Arkansas</option>
						<option value="CA">California</option>
						<option value="CO">Colorado</option>
						<option value="CT">Connecticut</option>
						<option value="DE">Delaware</option>
						<option value="DC">District Of Columbia</option>
						<option value="FL">Florida</option>
						<option value="GA">Georgia</option>
						<option value="HI">Hawaii</option>
						<option value="ID">Idaho</option>
						<option value="IL">Illinois</option>
						<option value="IN">Indiana</option>
						<option value="IA">Iowa</option>
						<option value="KS">Kansas</option>
						<option value="KY">Kentucky</option>
						<option value="LA">Louisiana</option>
						<option value="ME">Maine</option>
						<option value="MD">Maryland</option>
						<option value="MA">Massachusetts</option>
						<option value="MI">Michigan</option>
						<option value="MN">Minnesota</option>
						<option value="MS">Mississippi</option>
						<option value="MO">Missouri</option>
						<option value="MT">Montana</option>
						<option value="NE">Nebraska</option>
						<option value="NV">Nevada</option>
						<option value="NH">New Hampshire</option>
						<option value="NJ">New Jersey</option>
						<option value="NM">New Mexico</option>
						<option value="NY">New York</option>
						<option value="NC">North Carolina</option>
						<option value="ND">North Dakota</option>
						<option value="OH">Ohio</option>
						<option value="OK">Oklahoma</option>
						<option value="OR">Oregon</option>
						<option value="PA">Pennsylvania</option>
						<option value="RI">Rhode Island</option>
						<option value="SC">South Carolina</option>
						<option value="SD">South Dakota</option>
						<option value="TN">Tennessee</option>
						<option value="TX">Texas</option>
						<option value="UT">Utah</option>
						<option value="VT">Vermont</option>
						<option value="VA">Virginia</option>
						<option value="WA">Washington</option>
						<option value="WV">West Virginia</option>
						<option value="WI">Wisconsin</option>
						<option value="WY">Wyoming</option>
					</select>				
				  </div>
				  <div class="form-group">
				    <label for="borrower-zip">Zip</label>
				    <input type="number" class="form-control" name = "borrower-zip" id="borrower-zip" placeholder="Zip">
				  </div>
				  <div class="form-group">
				    <label for="borrower-home-phone">Home Phone</label>
				    <input type="tel" class="form-control" name = "borrower-home-phone" id="borrower-home-phone" placeholder="Home Phone">
				  </div>
				  <div class="form-group">
				    <label for="borrower-work-phone">Work Phone</label>
				    <input type="tel" class="form-control" name = "borrower-work-phone" id="borrower-work-phone" placeholder="Work Phone">
				  </div>
				  <div class="form-group">
				    <label for="borrower-cell-phone">Cell Phone</label>
				    <input type="tel" class="form-control" name = "borrower-cell-phone" id="borrower-cell-phone" placeholder="Cell Phone">
				  </div>
				  
				 
			  </fieldset>

			  <fieldset>
			  	<legend>Property/Loan Information</legend>
			  	<div class="form-group">
				    <label for="property-type">Property Type</label>
				    <br>
				    <select name="property-type" id="property-type" class="form-control">
				    	<option value="">Please Select...</option>
				    	<option value="SingleFamily">Single Family</option>
				    	<option value="MultiFamily">Multi Family</option>
				    	<option value="Condo">Condo</option>
				    	<option value="ManufacturedHome">Manufactured Home</option>
				    	<option value="Unknown">Unknown</option>
				    </select>
				 </div>
				 <div class="form-group">
				    <label for="loan-type">Loan Type</label>
				    <br>
				    <select name="loanType" id="loan-type" class="form-control">
						<option value="">Please Select...</option>
						<option value="Refinance">Refinance</option>
						<option value="Purchase">Purchase</option>
						<option value="FHA">FHA</option>
						<option value="Forclosure">Forclosure</option>
						<option value="HomeEquity">Home Equity</option>
						<option value="Construction">Construction</option>
		 				<option value="Collections">Collections</option>
					</select>
				 </div>
				 <div class="form-group">
				    <label for="appraisal-type">Type of Appraisal Form</label>
				    <br>
				    <select name="appraisal-type" id="appraisal-type" class="form-control">
						<option value="">Please Select...</option>
						<option value="Refinance">Refinance</option>
						<option value="Purchase">Purchase</option>
						<option value="FHA">FHA</option>
						<option value="Forclosure">Forclosure</option>
						<option value="HomeEquity">Home Equity</option>
						<option value="Construction">Construction</option>
		 				<option value="Collections">Collections</option>
					</select>
				 </div>
			  </fieldset>

			  <fieldset>
			  	<legend>Contact Information (if other than borrower)</legend>
				<div class="form-group">
				    <label for="contact-name">Name</label>
				    <input type="text" class="form-control" name = "contact-name" id="contact-name" placeholder="Name">
				</div>
				<div class="form-group">
				    <label for="contact-phone">Phone</label>
				    <input type="tel" class="form-control" name = "contact-phone" id="contact-phone" placeholder="Phone">
				</div>
				<div class="form-group">
				    <label for="contact-cell">Cell</label>
				    <input type="tel" class="form-control" name = "contact-cell" id="contact-cell" placeholder="Cell">
				</div>
			  </fieldset>

			  <fieldset>
			  	<legend>Additional Info</legend>
			  	<div class="form-group">
				    <label for="additional-info">Additional Info</label>
				    <textarea class="form-control" name="additional-info" id="additional-info" rows="10"></textarea>
				</div>
			  </fieldset>
			  	
				<button type="submit" class="btn btn-default">Submit Order</button>

			</form>
		</div>
		
</body>
</html>