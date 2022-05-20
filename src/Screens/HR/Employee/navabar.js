<Navbar   expand="lg" style={{backgroundColor:'##e6e9ed',width:'100%',marginTop:'5%'}}>
<Navbar.Brand ><button  onClick={e => {
  setGeneralButton('General')
}}>General</button></Navbar.Brand>
<Navbar.Brand ><button  onClick={e => {
  setContentButton('Content')
}}>Content</button></Navbar.Brand>

<Navbar.Brand ><button  onClick={e => {
  setLinkedDocument('LinkedDocument')
}}>Linked Document</button></Navbar.Brand>

<Navbar.Brand ><button  onClick={e => {
  setButtonDropdown('Attachments')
}}>Attachments</button></Navbar.Brand>

</Navbar>

{ButtonDropdown == 'Attachments' && <Attachment/> }
{GeneralButton == 'General' && <General/> }
{ContentButton == 'Content' && <Content/> }
{LinkedDocument == 'LinkedDocument' && <LinkedDocument/> }