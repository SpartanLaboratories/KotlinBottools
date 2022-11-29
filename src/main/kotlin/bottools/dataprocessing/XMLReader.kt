package bottools.dataprocessing

import org.w3c.dom.Document
import org.w3c.dom.Element
import org.w3c.dom.Node
import org.w3c.dom.NodeList
import org.xml.sax.SAXException
import java.io.FileNotFoundException
import java.io.FileOutputStream
import java.io.IOException
import javax.xml.parsers.DocumentBuilder
import javax.xml.parsers.DocumentBuilderFactory
import javax.xml.parsers.ParserConfigurationException
import javax.xml.transform.*
import javax.xml.transform.dom.DOMSource
import javax.xml.transform.stream.StreamResult
import kotlin.collections.ArrayList

/**
 * A wrapper around an existing XML reading library
 * @author Spartak
 */
open class XMLReader {
    private val dbf = DocumentBuilderFactory.newInstance()
    private lateinit var db: DocumentBuilder
    private var doc: Document? = null
    private lateinit var docName: String
    private lateinit var tr: Transformer
    private val debug = false
    private lateinit var currentNode : Node

    /**
     * Creates the XML reader
     */
    init {
        //debug = true;
        try {
            db = dbf.newDocumentBuilder()
            tr = TransformerFactory.newInstance().newTransformer()
            tr.setOutputProperty(OutputKeys.INDENT, "yes")
            tr.setOutputProperty(OutputKeys.METHOD, "xml")
            tr.setOutputProperty(OutputKeys.ENCODING, "UTF-8")
            tr.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4")
        } catch (e: ParserConfigurationException) {
            // TODO Auto-generated catch block
            e.printStackTrace()
        } catch (e: TransformerConfigurationException) {
            e.printStackTrace()
        } catch (e: TransformerFactoryConfigurationError) {
            e.printStackTrace()
        }
    }

    /**
     * Sets the document that is to be read and written to.
     *
     * @param pathName the name of the document including the file path from the root folder (project folder)
     */
    internal open infix fun setDocument(pathName: String) {
        docName = pathName
        try {
            db = dbf.newDocumentBuilder()
            doc = db.parse(pathName)
        } catch (e: FileNotFoundException) {
            //Botmain.out("A document with this filepath:\n$pathName\ncould not be found")
        } catch (e: SAXException) {
            // TODO Auto-generated catch block
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        } catch (e: ParserConfigurationException) {
            e.printStackTrace()
        }
    }

    val root: Node
        get() = doc!!.documentElement

    /**
     * Gets the sub-node of this node
     * @param node - the parent node
     * @return the child node
     */
    internal infix fun stepDown(node: Node): Node {
        if (debug) println("Starting step down function with: $node")
        var child = node.firstChild
        if (debug) println("First child: $child")
        child = child.nextSibling
        if (debug) println("Returning: $child")
        return node.firstChild.nextSibling
    }

    /**
     * Gets the next element of the same hierarchy level
     * @param node - the current node
     * @return the next node
     */
    internal infix fun stepOver(node: Node): Node {
        var node = node
        if (debug) println("Starting stepOver with: $node")
        var i = 0
        while (i < 2 && node != null) {
            try {
                node = node.nextSibling
                if (debug) println(node)
            } catch (e: NullPointerException) {
                println("A StepOver function is returning a null value.")
            }
            i++
        }
        if (debug) println("Finishing StepOver with: $node")
        return node
    }

    internal fun stepOver(node: Node, times: Int): Node {
        var times = times
        return if (times == 0) node else stepOver(stepOver(node), --times)
    }

    /**
     * Get the node of the hierarchically higher level that contains this node
     * @param node - the current node
     * @return the parent node
     */
    internal infix fun stepOut(node: Node): Node = node.parentNode

    internal infix fun getValue(node: Node): String = try {
        node.firstChild.nodeValue
    } catch (e: NullPointerException) {
        println(node.nodeName + ", " + node.nodeValue)
        val child = node.firstChild
        println(child.nodeName + ", " + child.nodeValue)
        ""
    }

    /**
     * The path string of the document that the reader is currently parsing
     * @return - The name of the document that is currently in use (the one that was set by [.setDocument]
     */
    private fun currentDocument(): String = this.docName

    /**
     * Writes a new element to the file
     * @param root - the element that will contain the new element
     * @param tagName - the name of the tag that is being created
     * @param content - the text value inside the tag that is being created
     * @return - The [Element] that was just created by this method
     */
    @JvmOverloads
    internal fun newChild(root: Node = this.root, tagName: String, content: String = ""): Element {
        val addition = doc!!.createElement(tagName.replace(" ".toRegex(), ""))
        addition.appendChild(doc!!.createTextNode(content))
        root.appendChild(addition)
        val oldRoot = root
        root.parentNode.replaceChild(root, oldRoot)
        write()
        return addition
    }
    infix fun at(node : Node) : XMLReader{
        currentNode = node
        return this
    }
    infix fun create(node : String) : Node = newChild(currentNode, node )
    infix fun createCategory(node :String){
        currentNode = this create node
    }
    @JvmOverloads
    private fun removeTag(root: Node = this.root, child: Node) {
        root.removeChild(child)
        write()
    }

    @JvmOverloads
    fun removePossibleTag(root: Node = this.root, child: Node) {
        if (root == null || child == null) return
        removeTag(root, child)
    }

    @JvmOverloads
    fun removeTag(root: Node = this.root, child: String) =
        removeTag(root, getChild(root, child)!!)

    @JvmOverloads
    fun removeTagByText(root: Node = this.root, textValue: String) {
        for (node in getChildren(root)) if (getValue(node) == textValue) removeTag(root, node)
    }

    fun replaceValue(newValue: String, vararg nodes: Node) {
        nodes[0].appendChild(doc!!.createTextNode(newValue))
        for (i in 1 until nodes.size)
            nodes[i].appendChild(nodes[i - 1])
    }

    fun setValue(node: Node, value: String?): Node {
        if (debug) println("setValue() start node value: " + node.textContent)
        node.textContent = value
        if (debug) println("setValue() end node value: " + node.textContent)
        write()
        return node
    }

    internal infix fun getChildren(node: Node): List<Node> {
        var node = node
        val children = ArrayList<Node>()
        try {
            node = node!!.firstChild
            if (node == null) return children
            node = node.nextSibling
            if (node == null) return children
            do {
                children.add(node)
            } while (stepOver(node).also { node = it } != null)
        } catch (e: NullPointerException) {
        }
        return children
    }

    fun getChild(parent: Node, name: String): Node {
        lateinit var child: Node
        var name = name.replace(" ".toRegex(), "")
        try {
            if (debug) println("The parent node is: " + parent.nodeName)
            if (stepDown(parent).also { child = it } == null) System.err.println("node: $parent does not have children")
            if (debug) println("The first child is: " + child!!.nodeName)
        } catch (e: NullPointerException) {
            System.err.println("node: $parent does not exist")
        }
        try {
            while (child!!.nodeName.lowercase() != name.lowercase()) {
                if (debug) println("Found child name: " + child!!.nodeName)
                child = child!!.nextSibling
            }
        } catch (e: NullPointerException) {
            try {
                System.err.println("No child node: " + name + " exists in parent node: " + parent.nodeName)
            } catch (n: NullPointerException) {
                n.printStackTrace()
                System.err.println("Parent node is null")
            }
        }
        return child
    }

    private fun write() {
        try {
            tr!!.transform(DOMSource(doc), StreamResult(FileOutputStream(currentDocument())))
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: TransformerException) {
            e.printStackTrace()
        }
    }

    fun nodeHasChild(parentNode: Node, child: String): Boolean = parentNode has child
}
infix fun Node.has(childName : String) : Boolean {
    for (i in 0 until childNodes.length) if (childNodes.item(i).nodeName == childName) return true
    return false
}
infix fun Node.getChild(name :String) : Node {
    var child = firstChild.nextSibling
    while(child.nodeName.lowercase() != name.lowercase())
        child = child.nextSibling
    return child
}
infix fun Node.then(nextFunction : (Node) -> String)    = nextFunction.invoke(this)
infix fun Node.then(nextFunction: (Node) -> NodeList) = nextFunction.invoke(this)
fun Node.getValue(): String = firstChild.nodeValue
infix fun Node.setValue(newValue : String) = firstChild.setNodeValue(newValue)
infix fun Node.containing(content : String) = this setValue content
operator fun Node.get(childName : String) = this getChild childName
operator fun Node.div(childName: String) = this getChild childName

operator fun Node.minus(childWithValue: String) = (this getChild childWithValue).getValue()
operator fun Node.set(childNode:String, newValue: String) = this[childNode] setValue newValue
