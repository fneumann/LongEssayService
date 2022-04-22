<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:php="http://php.net/xsl">
    <xsl:output method="xml" version="1.0" encoding="UTF-8"/>

    <!--  Basic rule: copy nothing -->
    <xsl:template match="*|@*">
    </xsl:template>

    <xsl:template match="html|body">
        <xsl:apply-templates select="*" />
    </xsl:template>


    <!-- copy only allowed elements, without attributes -->
    <xsl:template match="h1|h2|h3|h4|h5|h6|p|ul|ol|li|strong|em">
        <xsl:copy><xsl:apply-templates select="node()" /></xsl:copy>
    </xsl:template>


</xsl:stylesheet>